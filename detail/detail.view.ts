namespace $.$$ {

	type Link = {
		key: string
		peer: string
		note: string
		weight: number
	}

	/** Every connection of the selected cell, heaviest first. Clicking a row moves the selection there. */
	export class $bog_worm_detail extends $.$bog_worm_detail {

		@ $mol_mem
		cells() {
			const key = this.focus()
			if( !key ) return [] as readonly $bog_worm_cell[]
			return $bog_worm_graph.cells().filter( cell => cell.id === key || cell.cls === key )
		}

		name() {
			const cells = this.cells()
			if( !cells.length ) return ''
			if( cells.length === 1 ) return cells[ 0 ].id
			return `${ this.focus() } — ${ cells.map( cell => cell.id ).join( ', ' ) }`
		}

		facts() {

			const cells = this.cells()
			if( !cells.length ) return ''

			const head = cells[ 0 ]
			const facts = [ head.type, $bog_worm_graph.ganglia()[ head.ganglion ] ]
			if( head.nt.length ) facts.push( head.nt.join( ', ' ) )
			if( cells.length === 1 && head.title ) facts.unshift( head.title )

			return facts.join( ' · ' )
		}

		@ $mol_mem
		sections() {

			const cells = this.cells()
			const many = cells.length > 1
			const names = $bog_worm_graph.cells()

			const collect = ( tag: string, pick: ( cell: $bog_worm_cell ) => $bog_worm_edge[], side: ( edge: $bog_worm_edge, own: number ) => number ) => {
				const links: Link[] = []
				for( const cell of cells ) {
					for( const edge of pick( cell ) ) {
						const peer = side( edge, cell.index )
						if( peer === cell.index && edge.from === edge.to ) continue
						links.push({
							key: `${ tag }:${ edge.index }:${ cell.index }`,
							peer: names[ peer ].id,
							note: many ? cell.id : '',
							weight: edge.weight,
						})
					}
				}
				return links.sort( ( left, right ) => right.weight - left.weight )
			}

			return [
				{ key: 'out', title: 'Outgoing chemical', links: collect( 'out', cell => cell.out, edge => edge.to ) },
				{ key: 'inp', title: 'Incoming chemical', links: collect( 'inp', cell => cell.inp, edge => edge.from ) },
				{ key: 'gap', title: 'Gap junctions', links: collect( 'gap', cell => cell.gap, ( edge, own ) => edge.from === own ? edge.to : edge.from ) },
			].filter( section => section.links.length )
		}

		@ $mol_mem
		link_index() {
			const index = new Map<string, Link>()
			for( const section of this.sections() ) {
				for( const link of section.links ) index.set( link.key, link )
			}
			return index
		}

		@ $mol_mem
		rows() {
			const rows = [] as $mol_view[]
			for( const section of this.sections() ) {
				rows.push( this.Section( section.key ) )
				for( const link of section.links ) rows.push( this.Row( link.key ) )
			}
			return rows
		}

		section_title( key: string ) {
			const section = this.sections().find( section => section.key === key )!
			return `${ section.title } — ${ section.links.length }`
		}

		row_peer( key: string ) {
			return this.link_index().get( key )!.peer
		}

		row_note( key: string ) {
			return this.link_index().get( key )!.note
		}

		row_weight( key: string ) {
			return String( this.link_index().get( key )!.weight )
		}

		@ $mol_action
		row_click( key: string, next?: any ) {
			this.focus( this.link_index().get( key )!.peer )
			return null
		}

		@ $mol_action
		close( next?: any ) {
			this.focus( '' )
			return null
		}

	}

}
