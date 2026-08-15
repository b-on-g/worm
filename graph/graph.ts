namespace $ {

	export type $bog_worm_kind = 'chemical' | 'gap'

	export type $bog_worm_type = 'sensory' | 'inter' | 'motor' | 'poly' | 'unknown' | 'muscle' | 'other'

	export type $bog_worm_edge = {
		readonly index: number
		readonly from: number
		readonly to: number
		readonly kind: $bog_worm_kind
		readonly weight: number
	}

	export type $bog_worm_cell = {
		readonly index: number
		readonly id: string
		readonly cls: string
		readonly type: $bog_worm_type
		readonly ganglion: number
		readonly nt: readonly string[]
		readonly title: string
		readonly ap: number | null
		readonly dv: number | null
		readonly out: $bog_worm_edge[]
		readonly inp: $bog_worm_edge[]
		readonly gap: $bog_worm_edge[]
	}

	export type $bog_worm_layout = {
		readonly xs: Float64Array
		readonly ys: Float64Array
	}

	const types: Record<string, $bog_worm_type> = {
		s: 'sensory',
		i: 'inter',
		m: 'motor',
		p: 'poly',
		u: 'unknown',
		M: 'muscle',
		o: 'other',
	}

	/**
	 * The connectome as a graph: cells, edges and the two layouts.
	 * The data never changes, so everything here is a plain memoized static.
	 */
	export class $bog_worm_graph extends $mol_object2 {

		/** Columns of the layered layout, left to right. */
		static columns: readonly $bog_worm_type[][] = [
			[ 'sensory' ],
			[ 'poly' ],
			[ 'inter' ],
			[ 'motor' ],
			[ 'muscle' ],
			[ 'other', 'unknown' ],
		]

		static ganglia() {
			return $bog_worm_data.ganglia
		}

		static dataset() {
			return $bog_worm_data.dataset
		}

		/** Cells and edges are built together — every cell keeps its own incident edges. */
		@ $mol_memo.method
		static model() {

			const cells = $bog_worm_data.cells.split( '\n' ).map( ( line, index ) => {

				const part = line.split( ',' )

				return {
					index,
					id: part[ 0 ],
					cls: part[ 1 ],
					type: types[ part[ 2 ] ],
					ganglion: parseInt( part[ 3 ], 36 ),
					nt: part[ 4 ] ? part[ 4 ].split( ' ' ) : [],
					ap: part[ 5 ] ? Number( part[ 5 ] ) : null,
					dv: part[ 6 ] ? Number( part[ 6 ] ) : null,
					title: part.slice( 7 ).join( ',' ),
					out: [] as $bog_worm_edge[],
					inp: [] as $bog_worm_edge[],
					gap: [] as $bog_worm_edge[],
				} as $bog_worm_cell

			} )

			const edges = [] as $bog_worm_edge[]

			const parse = ( packed: string, kind: $bog_worm_kind ) => {
				if( !packed ) return
				for( const chunk of packed.split( ';' ) ) {
					const part = chunk.split( ',' )
					const edge = {
						index: edges.length,
						from: parseInt( part[ 0 ], 36 ),
						to: parseInt( part[ 1 ], 36 ),
						kind,
						weight: parseInt( part[ 2 ], 36 ),
					}
					edges.push( edge )
					if( kind === 'chemical' ) {
						cells[ edge.from ].out.push( edge )
						cells[ edge.to ].inp.push( edge )
					} else {
						cells[ edge.from ].gap.push( edge )
						// a dozen gap junctions in the source join two processes of one cell — count them once
						if( edge.to !== edge.from ) cells[ edge.to ].gap.push( edge )
					}
				}
			}

			parse( $bog_worm_data.chemical, 'chemical' )
			parse( $bog_worm_data.gap, 'gap' )

			const by_weight = ( left: $bog_worm_edge, right: $bog_worm_edge ) => right.weight - left.weight
			let weight_max = 1

			for( const cell of cells ) {
				cell.out.sort( by_weight )
				cell.inp.sort( by_weight )
				cell.gap.sort( by_weight )
			}

			for( const edge of edges ) if( edge.weight > weight_max ) weight_max = edge.weight

			const index = new Map( cells.map( cell => [ cell.id, cell ] ) )

			return { cells: cells as readonly $bog_worm_cell[], edges: edges as readonly $bog_worm_edge[], index, weight_max }
		}

		static cells() {
			return this.model().cells
		}

		static edges() {
			return this.model().edges
		}

		static index() {
			return this.model().index
		}

		static cell( id: string ) {
			return this.model().index.get( id ) ?? null
		}

		/** Heaviest edge weight, for scaling line widths. */
		static weight_max() {
			return this.model().weight_max
		}

		/** Every name the user may search for: cell names and class names alike. */
		@ $mol_memo.method
		static names() {
			const names = new Set<string>()
			for( const cell of this.cells() ) {
				names.add( cell.id )
				names.add( cell.cls )
			}
			return [ ... names ].sort()
		}

		static suggest( query: string, limit = 12 ) {

			const needle = query.trim().toUpperCase()
			if( !needle ) return [] as string[]

			const starts: string[] = []
			const inside: string[] = []

			for( const name of this.names() ) {
				const upper = name.toUpperCase()
				if( upper.startsWith( needle ) ) starts.push( name )
				else if( upper.includes( needle ) ) inside.push( name )
			}

			return [ ... starts, ... inside ].slice( 0, limit )
		}

		/** sensory → polymodal → interneurons → motor → muscle, sorted by ganglion inside a column. */
		@ $mol_memo.method
		static layered(): $bog_worm_layout {

			const cells = this.cells()
			const xs = new Float64Array( cells.length )
			const ys = new Float64Array( cells.length )

			const columns = this.columns.map( types => cells
				.filter( cell => types.includes( cell.type ) )
				.sort( ( left, right ) =>
					left.ganglion - right.ganglion || ( left.id < right.id ? -1 : left.id > right.id ? 1 : 0 )
				)
			)

			columns.forEach( ( column, place ) => {
				const x = ( place + .5 ) / columns.length
				column.forEach( ( cell, row ) => {
					xs[ cell.index ] = x
					ys[ cell.index ] = ( row + .5 ) / Math.max( column.length, 1 )
				} )
			} )

			return { xs, ys }
		}

		/**
		 * Fruchterman-Reingold, seeded from the layered layout plus a fixed pseudo-random jitter,
		 * so the picture is identical on every machine and every reload.
		 */
		@ $mol_memo.method
		static forced(): $bog_worm_layout {

			const cells = this.cells()
			const edges = this.edges()
			const count = cells.length

			const layered = this.layered()
			const xs = new Float64Array( count )
			const ys = new Float64Array( count )

			let seed = 20190701 // the Cook et al. publication date, any fixed number would do
			const random = () => ( seed = ( seed * 1103515245 + 12345 ) % 2147483648 ) / 2147483648

			for( let i = 0 ; i < count ; ++i ) {
				xs[ i ] = layered.xs[ i ] + ( random() - .5 ) * .2
				ys[ i ] = layered.ys[ i ] + ( random() - .5 ) * .2
			}

			const dx = new Float64Array( count )
			const dy = new Float64Array( count )

			const k = Math.sqrt( 1 / count ) // ideal edge length for a unit square
			const rounds = 300
			const gravity = .02 // keeps cells without synapses from drifting off the picture
			const repulsion = 2.5 // spreads the core apart, the connectome is dense enough to clump otherwise

			// hubs carry hundreds of edges — without a mass term they collapse the whole graph into a dot
			const mass = new Float64Array( count ).fill( 1 )
			for( const edge of edges ) {
				mass[ edge.from ] += .25
				mass[ edge.to ] += .25
			}

			for( let round = 0 ; round < rounds ; ++round ) {

				dx.fill( 0 )
				dy.fill( 0 )

				for( let i = 0 ; i < count ; ++i ) {
					for( let j = i + 1 ; j < count ; ++j ) {
						let ox = xs[ i ] - xs[ j ]
						let oy = ys[ i ] - ys[ j ]
						let dist = Math.sqrt( ox * ox + oy * oy )
						if( dist < 1e-4 ) { ox = 1e-4; oy = 1e-4; dist = 1.41e-4 }
						const force = repulsion * k * k * mass[ i ] * mass[ j ] / dist / dist
						dx[ i ] += ox * force
						dy[ i ] += oy * force
						dx[ j ] -= ox * force
						dy[ j ] -= oy * force
					}
				}

				for( const edge of edges ) {
					const ox = xs[ edge.from ] - xs[ edge.to ]
					const oy = ys[ edge.from ] - ys[ edge.to ]
					const dist = Math.sqrt( ox * ox + oy * oy ) || 1e-4
					const force = dist * dist / k * ( edge.kind === 'gap' ? 1.4 : 1 ) / dist
					dx[ edge.from ] -= ox * force
					dy[ edge.from ] -= oy * force
					dx[ edge.to ] += ox * force
					dy[ edge.to ] += oy * force
				}

				const heat = .05 * ( 1 - round / rounds )

				for( let i = 0 ; i < count ; ++i ) {
					dx[ i ] += ( .5 - xs[ i ] ) * gravity * mass[ i ] / k
					dy[ i ] += ( .5 - ys[ i ] ) * gravity * mass[ i ] / k
					const step = Math.min( heat, Math.hypot( dx[ i ], dy[ i ] ) / mass[ i ] )
					const len = Math.hypot( dx[ i ], dy[ i ] ) || 1e-9
					xs[ i ] += dx[ i ] / len * step
					ys[ i ] += dy[ i ] / len * step
				}

			}

			return this.normalized( xs, ys )
		}

		/**
		 * Rescales a cloud of points into the unit square, keeping the aspect ratio.
		 * The bounds come from the 2nd and 98th percentile — a handful of cells without any synapse
		 * end up far outside the core and would otherwise squeeze the whole picture into a dot.
		 */
		static normalized( xs: Float64Array, ys: Float64Array ): $bog_worm_layout {

			const bounds = ( values: Float64Array ) => {
				const sorted = Array.from( values ).sort( ( left, right ) => left - right )
				const edge = Math.floor( sorted.length * .02 )
				return [ sorted[ edge ], sorted[ sorted.length - 1 - edge ] ]
			}

			const [ left, right ] = bounds( xs )
			const [ top, bottom ] = bounds( ys )

			const span = Math.max( right - left, bottom - top ) || 1
			const shift_x = ( span - ( right - left ) ) / 2
			const shift_y = ( span - ( bottom - top ) ) / 2
			const clamp = ( value: number ) => Math.min( 1, Math.max( 0, value ) )

			for( let i = 0 ; i < xs.length ; ++i ) {
				xs[ i ] = clamp( ( xs[ i ] - left + shift_x ) / span )
				ys[ i ] = clamp( ( ys[ i ] - top + shift_y ) / span )
			}

			return { xs, ys }
		}

		/**
		 * Up to `limit` shortest signal paths along directed chemical synapses.
		 * Returns cell index chains, heaviest first. Empty when nothing reaches the target in `hops`.
		 */
		static paths( from: number, to: number, limit = 3, hops = 5 ): number[][] {

			const cells = this.cells()

			if( from === to || from < 0 || to < 0 ) return []

			const ahead = this.distances( from, hops, cell => cell.out.map( edge => edge.to ) )
			const behind = this.distances( to, hops, cell => cell.inp.map( edge => edge.from ) )

			const length = ahead[ to ]
			if( length < 0 || length > hops ) return []

			const found: number[][] = []

			const walk = ( chain: number[] ) => {
				if( found.length >= limit ) return
				const last = chain[ chain.length - 1 ]
				if( last === to ) { found.push( chain ); return }

				const next = cells[ last ].out
					.filter( edge => ahead[ edge.to ] === chain.length && behind[ edge.to ] === length - chain.length )
					.sort( ( left, right ) => right.weight - left.weight )

				for( const edge of next ) walk( [ ...chain, edge.to ] )
			}

			walk( [ from ] )

			return found
		}

		/** Breadth first hop counts from a cell, -1 where unreachable within `hops`. */
		static distances( start: number, hops: number, step: ( cell: $bog_worm_cell ) => number[] ) {

			const cells = this.cells()
			const dist = new Int16Array( cells.length ).fill( -1 )

			dist[ start ] = 0
			let front = [ start ]

			for( let depth = 1 ; depth <= hops && front.length ; ++depth ) {
				const next: number[] = []
				for( const index of front ) {
					for( const near of step( cells[ index ] ) ) {
						if( dist[ near ] >= 0 ) continue
						dist[ near ] = depth
						next.push( near )
					}
				}
				front = next
			}

			return dist
		}

	}

}
