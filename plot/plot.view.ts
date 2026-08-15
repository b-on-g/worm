namespace $.$$ {

	type Palette = {
		chemical: string
		arrow: string
		gap: string
		dim: string
		label: string
		halo: string
	}

	/** Cell colours are shared with the legend, only the neutrals follow the theme. */
	const palettes: Record<'light' | 'dark', Palette> = {
		light: {
			chemical: '#8494a3',
			arrow: '#55636f',
			gap: '#c98a2e',
			dim: '#d3dae0',
			label: '#25303a',
			halo: '#ffffffcc',
		},
		dark: {
			chemical: '#61707d',
			arrow: '#9fb0bc',
			gap: '#c08a3e',
			dim: '#39434c',
			label: '#dbe4ec',
			halo: '#0e1116cc',
		},
	}

	/** Five line widths — every edge falls into one of them, so the canvas strokes five paths, not seven thousand. */
	const buckets = 5

	/**
	 * The connectome itself: edges and cells on one canvas, with panning, zooming,
	 * hit testing and highlighting done by hand — no graph library involved.
	 */
	export class $bog_worm_plot extends $.$bog_worm_plot {

		// ------------------------------------------------------------ viewport

		@ $mol_mem
		zoom( next?: number ) {
			return next ?? 1
		}

		@ $mol_mem
		center( next?: readonly number[] ) {
			return next ?? [ .5, .5 ]
		}

		@ $mol_action
		reset() {
			this.zoom( 1 )
			this.center([ .5, .5 ])
			this.picked( -1 )
		}

		/** The layered picture is a diagram and fills the viewport, the force one is a map and keeps its shape. */
		scale() {
			const base = this.zoom() * .92
			if( this.layout_name() === 'force' ) {
				const side = Math.min( this.width(), this.height() )
				return [ side * base, side * base ]
			}
			return [ this.width() * base, this.height() * base ]
		}

		offset() {
			const [ sx, sy ] = this.scale()
			const [ cx, cy ] = this.center()
			return [ this.width() / 2 - cx * sx, this.height() / 2 - cy * sy ]
		}

		/** Canvas point in device pixels for a client point of a pointer event. */
		device( client_x: number, client_y: number ) {
			const rect = this.dom_node().getBoundingClientRect()
			const ratio = this.$.$mol_dom_context.devicePixelRatio
			return [ ( client_x - rect.left ) * ratio, ( client_y - rect.top ) * ratio ]
		}

		world( client_x: number, client_y: number ) {
			const [ x, y ] = this.device( client_x, client_y )
			const [ sx, sy ] = this.scale()
			const [ ox, oy ] = this.offset()
			return [ ( x - ox ) / sx, ( y - oy ) / sy ]
		}

		// ------------------------------------------------------------ filtering

		@ $mol_mem
		layout() {
			return this.layout_name() === 'force' ? $bog_worm_graph.forced() : $bog_worm_graph.layered()
		}

		@ $mol_mem
		visible() {
			const types = this.types()
			const cells = $bog_worm_graph.cells()
			const flags = new Uint8Array( cells.length )
			for( const cell of cells ) flags[ cell.index ] = types[ cell.type ] === false ? 0 : 1
			return flags
		}

		@ $mol_mem
		drawn() {
			const kinds = this.kinds()
			const least = this.weight_min()
			const seen = this.visible()
			return $bog_worm_graph.edges().filter( edge =>
				kinds[ edge.kind ] !== false
				&& edge.weight >= least
				&& seen[ edge.from ] === 1
				&& seen[ edge.to ] === 1
			)
		}

		// ------------------------------------------------------------ selection

		/** A focus key is either a cell name or a class name, so "ASH" lights up both ASHL and ASHR. */
		@ $mol_mem
		focus_cells() {
			const key = this.focus()
			if( !key ) return [] as number[]
			return $bog_worm_graph.cells()
				.filter( cell => cell.id === key || cell.cls === key )
				.map( cell => cell.index )
		}

		@ $mol_mem
		path_chains() {
			const from = this.path_ends( this.path_from() )
			const to = this.path_ends( this.path_to() )
			if( !from.length || !to.length ) return [] as number[][]

			const found: number[][] = []
			for( const start of from ) {
				for( const finish of to ) {
					found.push( ... $bog_worm_graph.paths( start, finish ) )
				}
			}

			const weight = ( path: number[] ) => {
				const cells = $bog_worm_graph.cells()
				let least = Infinity
				for( let step = 1 ; step < path.length ; ++step ) {
					const edge = cells[ path[ step - 1 ] ].out.find( edge => edge.to === path[ step ] )
					if( edge ) least = Math.min( least, edge.weight )
				}
				return least
			}

			return found
				.sort( ( left, right ) => left.length - right.length || weight( right ) - weight( left ) )
				.slice( 0, 3 )
		}

		path_ends( key: string ) {
			if( !key ) return [] as number[]
			return $bog_worm_graph.cells()
				.filter( cell => cell.id === key || cell.cls === key )
				.map( cell => cell.index )
				.slice( 0, 8 )
		}

		/** Cells and edges kept bright while everything else fades out. Null when nothing is selected. */
		@ $mol_mem
		lit() {

			const focus = this.focus_cells()
			const chains = this.path_chains()
			if( !focus.length && !chains.length ) return null

			const cells = $bog_worm_graph.cells()
			const bright = new Uint8Array( cells.length )
			const edges = new Set<number>()

			// only connections that survive the filters count as neighbourhood,
			// otherwise the picture would name neighbours whose edges are not on screen
			const shown = new Set( this.drawn().map( edge => edge.index ) )

			for( const index of focus ) {
				bright[ index ] = 2
				for( const edge of [ ... cells[ index ].out, ... cells[ index ].inp, ... cells[ index ].gap ] ) {
					if( !shown.has( edge.index ) ) continue
					bright[ edge.from ] ||= 1
					bright[ edge.to ] ||= 1
					edges.add( edge.index )
				}
			}

			for( const chain of chains ) {
				for( let step = 0 ; step < chain.length ; ++step ) {
					bright[ chain[ step ] ] = 2
					if( !step ) continue
					const edge = cells[ chain[ step - 1 ] ].out.find( edge => edge.to === chain[ step ] )
					if( edge ) edges.add( edge.index )
				}
			}

			return { cells: bright, edges }
		}

		// ------------------------------------------------------------ draw plan

		/**
		 * Edges grouped by layer, kind and line width, recomputed only when the filters change.
		 * Panning and zooming then just replay the groups.
		 */
		@ $mol_mem
		edge_plan() {

			const lit = this.lit()
			const span = Math.log( $bog_worm_graph.weight_max() + 1 )
			const plan = [] as { layer: 'dim' | 'plain' | 'lit', kind: $bog_worm_kind, bucket: number, list: number[] }[]

			const slot = new Map<string, number[]>()
			const list = ( layer: 'dim' | 'plain' | 'lit', kind: $bog_worm_kind, bucket: number ) => {
				const key = `${ layer }/${ kind }/${ bucket }`
				let found = slot.get( key )
				if( !found ) {
					found = []
					slot.set( key, found )
					plan.push({ layer, kind, bucket, list: found })
				}
				return found
			}

			for( const edge of this.drawn() ) {
				const bucket = Math.min( buckets - 1, Math.floor( Math.log( edge.weight + 1 ) / span * buckets ) )
				const layer = !lit ? 'plain' : lit.edges.has( edge.index ) ? 'lit' : 'dim'
				list( layer, edge.kind, bucket ).push( edge.index )
			}

			const order = { dim: 0, plain: 1, lit: 2 }
			return plan.sort( ( left, right ) => order[ left.layer ] - order[ right.layer ] || left.bucket - right.bucket )
		}

		@ $mol_mem
		cell_plan() {

			const lit = this.lit()
			const seen = this.visible()
			const plan = new Map<string, number[]>()

			for( const cell of $bog_worm_graph.cells() ) {
				if( !seen[ cell.index ] ) continue
				const layer = !lit ? 'plain' : lit.cells[ cell.index ] ? 'lit' : 'dim'
				const key = `${ layer }/${ cell.type }`
				const found = plan.get( key ) ?? plan.set( key, [] ).get( key )!
				found.push( cell.index )
			}

			const order = { dim: 0, plain: 1, lit: 2 }
			return [ ... plan ]
				.map( ( [ key, list ] ) => {
					const [ layer, type ] = key.split( '/' )
					return { layer: layer as 'dim' | 'plain' | 'lit', type, list }
				} )
				.sort( ( left, right ) => order[ left.layer ] - order[ right.layer ] )
		}

		// ------------------------------------------------------------ painting

		@ $mol_mem
		paint() {

			const context = this.context()
			const width = this.width()
			const height = this.height()

			context.clearRect( 0, 0, width, height )
			if( !width || !height ) return

			const paint = palettes[ this.$.$mol_lights() ? 'light' : 'dark' ]
			const ratio = this.$.$mol_dom_context.devicePixelRatio
			const layout = this.layout()
			const edges = $bog_worm_graph.edges()

			const [ sx, sy ] = this.scale()
			const [ ox, oy ] = this.offset()
			const at_x = ( index: number ) => layout.xs[ index ] * sx + ox
			const at_y = ( index: number ) => layout.ys[ index ] * sy + oy

			const zoom = this.zoom()
			const radius = 3.1 * ratio * Math.min( Math.max( zoom, .7 ), 2.6 )
			const widths = [ .5, .9, 1.5, 2.3, 3.4 ].map( value => value * ratio * Math.min( Math.max( zoom, .8 ), 2 ) )
			const alpha = { dim: .12, plain: .3, lit: .95 }

			const plan = this.edge_plan()
			const arrows = plan.reduce( ( sum, group ) => sum + ( group.layer === 'dim' ? 0 : group.list.length ), 0 )
			const with_arrows = arrows <= 3000 || zoom >= 2

			for( const group of plan ) {

				context.globalAlpha = alpha[ group.layer ]
				context.lineWidth = widths[ group.bucket ]
				context.strokeStyle = group.layer === 'dim'
					? paint.dim
					: group.kind === 'gap' ? paint.gap : paint.chemical
				context.setLineDash( group.kind === 'gap' ? [ 4 * ratio, 3 * ratio ] : [] )

				context.beginPath()
				for( const index of group.list ) {
					const edge = edges[ index ]
					context.moveTo( at_x( edge.from ), at_y( edge.from ) )
					context.lineTo( at_x( edge.to ), at_y( edge.to ) )
				}
				context.stroke()

				if( group.kind !== 'chemical' ) continue
				if( group.layer === 'dim' ) continue
				if( !with_arrows && group.layer !== 'lit' ) continue

				const size = Math.max( 5.5 * ratio, widths[ group.bucket ] * 3 )
				// keep the head clear of the target dot, highlighted dots are drawn larger
				const clearance = radius * 1.8
				context.globalAlpha = Math.min( 1, alpha[ group.layer ] * 2.2 )
				context.fillStyle = paint.arrow
				context.beginPath()

				for( const index of group.list ) {
					const edge = edges[ index ]
					const x1 = at_x( edge.from ), y1 = at_y( edge.from )
					const x2 = at_x( edge.to ), y2 = at_y( edge.to )
					const dx = x2 - x1, dy = y2 - y1
					const len = Math.sqrt( dx * dx + dy * dy )
					if( len < clearance + size ) continue
					const ux = dx / len, uy = dy / len
					const tip_x = x2 - ux * clearance, tip_y = y2 - uy * clearance
					context.moveTo( tip_x, tip_y )
					context.lineTo( tip_x - ux * size + uy * size * .5, tip_y - uy * size - ux * size * .5 )
					context.lineTo( tip_x - ux * size - uy * size * .5, tip_y - uy * size + ux * size * .5 )
				}

				context.fill()
			}

			context.setLineDash( [] )

			for( const group of this.cell_plan() ) {
				context.globalAlpha = group.layer === 'dim' ? .22 : 1
				context.fillStyle = group.layer === 'dim'
					? paint.dim
					: $bog_worm_hue[ group.type ]
				context.beginPath()
				for( const index of group.list ) {
					const size = group.layer === 'lit' ? radius * 1.35 : radius
					context.moveTo( at_x( index ) + size, at_y( index ) )
					context.arc( at_x( index ), at_y( index ), size, 0, Math.PI * 2 )
				}
				context.fill()
			}

			context.globalAlpha = 1
			this.paint_labels( context, paint, ratio, at_x, at_y )
		}

		paint_labels(
			context: CanvasRenderingContext2D,
			paint: Palette,
			ratio: number,
			at_x: ( index: number ) => number,
			at_y: ( index: number ) => number,
		) {

			const cells = $bog_worm_graph.cells()
			const lit = this.lit()
			const seen = this.visible()
			const hover = this.hover()
			const named = new Set<number>()

			if( lit ) {
				for( let index = 0 ; index < lit.cells.length ; ++index ) {
					if( lit.cells[ index ] === 2 ) named.add( index )
				}
				if( named.size < 90 ) {
					for( let index = 0 ; index < lit.cells.length ; ++index ) {
						if( lit.cells[ index ] === 1 && named.size < 90 ) named.add( index )
					}
				}
			}
			else if( this.zoom() >= 2.2 ) {
				for( const cell of cells ) {
					if( named.size >= 200 ) break
					if( !seen[ cell.index ] ) continue
					const x = at_x( cell.index ), y = at_y( cell.index )
					if( x < 0 || y < 0 || x > this.width() || y > this.height() ) continue
					named.add( cell.index )
				}
			}

			const hovered = hover ? $bog_worm_graph.cell( hover ) : null
			if( hovered ) named.add( hovered.index )

			if( !named.size ) return

			context.font = `${ Math.round( 11 * ratio ) }px ui-sans-serif, system-ui, sans-serif`
			context.textBaseline = 'middle'
			context.lineWidth = 3 * ratio
			context.strokeStyle = paint.halo
			context.fillStyle = paint.label

			const shift = 5.5 * ratio
			for( const index of named ) {
				const x = at_x( index ) + shift
				const y = at_y( index )
				context.strokeText( cells[ index ].id, x, y )
				context.fillText( cells[ index ].id, x, y )
			}
		}

		// ------------------------------------------------------------ hit testing

		/** Uniform grid over the layout, so hover does not scan four hundred cells on every mouse move. */
		@ $mol_mem
		grid() {

			const layout = this.layout()
			const side = 48
			const buckets = Array.from( { length: side * side }, () => [] as number[] )

			for( let index = 0 ; index < layout.xs.length ; ++index ) {
				const col = Math.min( side - 1, Math.max( 0, Math.floor( layout.xs[ index ] * side ) ) )
				const row = Math.min( side - 1, Math.max( 0, Math.floor( layout.ys[ index ] * side ) ) )
				buckets[ row * side + col ].push( index )
			}

			return { side, buckets }
		}

		cell_at( wx: number, wy: number ) {

			const { side, buckets } = this.grid()
			const layout = this.layout()
			const seen = this.visible()
			const [ sx, sy ] = this.scale()

			const reach = 8 * this.$.$mol_dom_context.devicePixelRatio
			const rx = reach / sx
			const ry = reach / sy

			const col = Math.floor( wx * side )
			const row = Math.floor( wy * side )
			const span_x = Math.ceil( rx * side ) + 1
			const span_y = Math.ceil( ry * side ) + 1

			let best = -1
			let best_dist = Infinity

			for( let r = row - span_y ; r <= row + span_y ; ++r ) {
				if( r < 0 || r >= side ) continue
				for( let c = col - span_x ; c <= col + span_x ; ++c ) {
					if( c < 0 || c >= side ) continue
					for( const index of buckets[ r * side + c ] ) {
						if( !seen[ index ] ) continue
						const dx = ( layout.xs[ index ] - wx ) * sx
						const dy = ( layout.ys[ index ] - wy ) * sy
						const dist = dx * dx + dy * dy
						if( dist > reach * reach || dist >= best_dist ) continue
						best_dist = dist
						best = index
					}
				}
			}

			return best
		}

		edge_at( wx: number, wy: number ) {

			const layout = this.layout()
			const [ sx, sy ] = this.scale()
			const reach = 5 * this.$.$mol_dom_context.devicePixelRatio

			let best = -1
			let best_dist = reach * reach

			for( const edge of this.drawn() ) {

				const x1 = layout.xs[ edge.from ] * sx, y1 = layout.ys[ edge.from ] * sy
				const x2 = layout.xs[ edge.to ] * sx, y2 = layout.ys[ edge.to ] * sy
				const px = wx * sx, py = wy * sy

				const dx = x2 - x1, dy = y2 - y1
				const len2 = dx * dx + dy * dy || 1
				const t = Math.min( 1, Math.max( 0, ( ( px - x1 ) * dx + ( py - y1 ) * dy ) / len2 ) )
				const ox = px - ( x1 + t * dx ), oy = py - ( y1 + t * dy )
				const dist = ox * ox + oy * oy

				if( dist >= best_dist ) continue
				best_dist = dist
				best = edge.index
			}

			return best
		}

		// ------------------------------------------------------------ pointer

		pointers = new Map<number, { x: number, y: number, at: number, moved: number }>()

		@ $mol_mem
		grabbing( next?: boolean ) {
			return next ?? false
		}

		@ $mol_action
		event_down( event?: PointerEvent ) {
			if( !event ) return null
			this.pointers.set( event.pointerId, { x: event.clientX, y: event.clientY, at: event.timeStamp, moved: 0 } )
			this.grabbing( true )
			return null
		}

		@ $mol_action
		event_move( event?: PointerEvent ) {
			if( !event ) return null

			const held = this.pointers.get( event.pointerId )

			if( !held ) {
				this.hover_at( event.clientX, event.clientY )
				return null
			}

			const dx = event.clientX - held.x
			const dy = event.clientY - held.y
			held.moved += Math.abs( dx ) + Math.abs( dy )
			held.x = event.clientX
			held.y = event.clientY

			if( this.pointers.size >= 2 ) {
				this.pinch()
				return null
			}

			const ratio = this.$.$mol_dom_context.devicePixelRatio
			const [ sx, sy ] = this.scale()
			const [ cx, cy ] = this.center()
			this.center([ cx - dx * ratio / sx, cy - dy * ratio / sy ])

			return null
		}

		pinch_span = 0

		pinch() {
			const [ first, second ] = [ ... this.pointers.values() ]
			const span = Math.hypot( first.x - second.x, first.y - second.y )
			const middle_x = ( first.x + second.x ) / 2
			const middle_y = ( first.y + second.y ) / 2
			if( this.pinch_span ) this.zoom_at( middle_x, middle_y, span / this.pinch_span )
			this.pinch_span = span
		}

		@ $mol_action
		event_up( event?: PointerEvent ) {
			if( !event ) return null

			const held = this.pointers.get( event.pointerId )
			this.pointers.delete( event.pointerId )
			if( this.pointers.size < 2 ) this.pinch_span = 0
			if( !this.pointers.size ) this.grabbing( false )

			if( held && held.moved < 6 && event.timeStamp - held.at < 700 ) this.tap( event.clientX, event.clientY )

			return null
		}

		@ $mol_action
		event_off( event?: PointerEvent ) {
			if( !event ) return null
			this.pointers.delete( event.pointerId )
			this.pinch_span = 0
			if( !this.pointers.size ) this.grabbing( false )
			return null
		}

		@ $mol_action
		event_leave( event?: PointerEvent ) {
			this.hover( '' )
			return null
		}

		@ $mol_action
		event_wheel( event?: WheelEvent ) {
			if( !event ) return null
			event.preventDefault()
			const step = event.deltaMode ? event.deltaY * 16 : event.deltaY
			this.zoom_at( event.clientX, event.clientY, Math.exp( -step * .0015 ) )
			return null
		}

		zoom_at( client_x: number, client_y: number, factor: number ) {
			const [ bx, by ] = this.world( client_x, client_y )
			this.zoom( Math.min( 60, Math.max( .4, this.zoom() * factor ) ) )
			const [ ax, ay ] = this.world( client_x, client_y )
			const [ cx, cy ] = this.center()
			this.center([ cx + bx - ax, cy + by - ay ])
		}

		hover_at( client_x: number, client_y: number ) {
			const [ wx, wy ] = this.world( client_x, client_y )
			const index = this.cell_at( wx, wy )
			const rect = this.dom_node().getBoundingClientRect()
			this.tip_x( Math.round( client_x - rect.left ) )
			this.tip_y( Math.round( client_y - rect.top ) )
			this.hover( index < 0 ? '' : $bog_worm_graph.cells()[ index ].id )
		}

		tap( client_x: number, client_y: number ) {

			const [ wx, wy ] = this.world( client_x, client_y )
			const rect = this.dom_node().getBoundingClientRect()
			this.tip_x( Math.round( client_x - rect.left ) )
			this.tip_y( Math.round( client_y - rect.top ) )

			const index = this.cell_at( wx, wy )
			if( index >= 0 ) {
				const cell = $bog_worm_graph.cells()[ index ]
				this.picked( -1 )
				this.focus( this.focus() === cell.id ? '' : cell.id )
				return
			}

			const edge = this.edge_at( wx, wy )
			this.picked( edge )
			if( edge < 0 ) this.focus( '' )
		}

		// ------------------------------------------------------------ tooltip

		@ $mol_mem
		tip() {

			const picked = this.picked()
			if( picked >= 0 ) {
				const edge = $bog_worm_graph.edges()[ picked ]
				const cells = $bog_worm_graph.cells()
				const arrow = edge.kind === 'chemical' ? '→' : '↔'
				const kind = edge.kind === 'chemical' ? 'chemical synapse' : 'gap junction'
				return `${ cells[ edge.from ].id } ${ arrow } ${ cells[ edge.to ].id }\n${ kind } · weight ${ edge.weight }`
			}

			const cell = this.hover() ? $bog_worm_graph.cell( this.hover() ) : null
			if( !cell ) return ''

			const head = cell.title ? `${ cell.id } — ${ cell.title }` : cell.id
			const kind = [ cell.type, $bog_worm_graph.ganglia()[ cell.ganglion ], ... cell.nt ].join( ' · ' )
			const links = [
				`${ cell.inp.length } in`,
				`${ cell.out.length } out`,
				`${ cell.gap.length } gap`,
			].join( ' · ' )

			return `${ head }\n${ kind }\n${ links }`
		}

	}

}
