namespace $.$$ {

	const type_keys = [ 'sensory', 'poly', 'inter', 'motor', 'muscle', 'other' ]
	const kind_keys = [ 'chemical', 'gap' ]

	/**
	 * Whole application: filters and the signal path on the left, the connectome in the middle,
	 * the connections of the selected cell on the right. Every bit of that state lives in the URL.
	 */
	export class $bog_worm extends $.$bog_worm {

		// ------------------------------------------------------------ state in the address

		arg( key: string, next?: string ) {
			if( next === undefined ) return this.$.$mol_state_arg.value( key ) ?? ''
			return this.$.$mol_state_arg.value( key, next || null ) ?? ''
		}

		focus( next?: string ) {
			return this.arg( 'focus', next )
		}

		path_from( next?: string ) {
			return this.arg( 'from', next )
		}

		path_to( next?: string ) {
			return this.arg( 'to', next )
		}

		layout_name( next?: string ) {
			return this.arg( 'view', next ) || 'layered'
		}

		weight_min( next?: number ) {
			if( next === undefined ) return Number( this.arg( 'weight' ) ) || 1
			this.arg( 'weight', next > 1 ? String( next ) : '' )
			return next
		}

		/** Hidden cell types and connection kinds travel in the address as a dash separated list. */
		off( key: string, name: string, next?: boolean ) {
			const hidden = new Set( this.arg( key ).split( '-' ).filter( Boolean ) )
			if( next === undefined ) return !hidden.has( name )
			if( next ) hidden.delete( name )
			else hidden.add( name )
			this.arg( key, [ ... hidden ].join( '-' ) )
			return next
		}

		type_on( type: string, next?: boolean ) {
			return this.off( 'hide', type, next )
		}

		kind_on( kind: string, next?: boolean ) {
			return this.off( 'links', kind, next )
		}

		@ $mol_mem
		types() {
			const dict = {} as Record<string, boolean>
			for( const key of type_keys ) dict[ key ] = this.type_on( key )
			dict.unknown = dict.other
			return dict
		}

		@ $mol_mem
		kinds() {
			const dict = {} as Record<string, boolean>
			for( const key of kind_keys ) dict[ key ] = this.kind_on( key )
			return dict
		}

		// ------------------------------------------------------------ header

		count() {
			const cells = $bog_worm_graph.cells()
			const neurons = cells.filter( cell => cell.type !== 'muscle' && cell.type !== 'other' ).length
			return `${ neurons } neurons · ${ cells.length - neurons } muscles and other cells · ${ $bog_worm_graph.edges().length } connections`
		}

		@ $mol_mem
		query_text( next?: string ) {
			return next ?? ''
		}

		/** Typing or picking a full name — a cell like ASHL or a class like ASH — selects it right away. */
		@ $mol_mem
		query( next?: string ) {
			if( next === undefined ) return this.query_text()

			this.query_text( next )

			const needle = next.trim().toUpperCase()
			const found = $bog_worm_graph.names().find( name => name.toUpperCase() === needle )
			if( found ) this.focus( found )

			return next
		}

		suggests() {
			return $bog_worm_graph.suggest( this.query() )
		}

		@ $mol_action
		reset( next?: any ) {
			this.Canvas().reset()
			return null
		}

		@ $mol_action
		escape( next?: any ) {
			this.focus( '' )
			this.path_from( '' )
			this.path_to( '' )
			this.Canvas().picked( -1 )
			return null
		}

		// ------------------------------------------------------------ layout

		/** Narrow enough that the side panels have to float above the canvas instead of beside it. */
		layout_kind() {
			return this.$.$mol_media.match( '(max-width: 860px)' ) ? 'narrow' : 'wide'
		}

		@ $mol_mem
		panel_showed( next?: boolean ) {
			if( next !== undefined ) return next
			return this.layout_kind() === 'wide'
		}

		panel_state() {
			return this.panel_showed() ? 'on' : 'off'
		}

		@ $mol_mem
		stage() {
			return [
				... this.panel_showed() ? [ this.Aside() ] : [],
				this.Board(),
				... this.focus() ? [ this.Links() ] : [],
			]
		}

		@ $mol_mem
		board() {
			return [
				this.Canvas(),
				... this.tip_text() ? [ this.Tip() ] : [],
			]
		}

		tip_text() {
			return this.Canvas().tip()
		}

		tip_left() {
			const ratio = this.$.$mol_dom_context.devicePixelRatio
			const limit = this.Canvas().width() / ratio - 272
			return `${ Math.round( Math.max( 8, Math.min( this.Canvas().tip_x() + 14, limit ) ) ) }px`
		}

		tip_top() {
			const ratio = this.$.$mol_dom_context.devicePixelRatio
			const limit = this.Canvas().height() / ratio - 84
			return `${ Math.round( Math.max( 8, Math.min( this.Canvas().tip_y() + 16, limit ) ) ) }px`
		}

		// ------------------------------------------------------------ keyboard

		auto() {
			return [ this.keyboard() ]
		}

		@ $mol_mem
		keyboard() {
			return new $mol_dom_listener(
				this.$.$mol_dom_context.document,
				'keydown',
				$mol_wire_async( ( event: KeyboardEvent ) => this.key( event ) ),
			)
		}

		@ $mol_action
		key( event: KeyboardEvent ) {
			if( event.key !== 'Escape' ) return
			if( !this.focus() && !this.path_from() && !this.path_to() ) return
			this.escape()
		}

	}

}
