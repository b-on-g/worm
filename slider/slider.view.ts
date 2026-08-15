namespace $.$$ {

	/** A native range input, because $mol has no slider of its own. */
	export class $bog_worm_slider extends $.$bog_worm_slider {

		value_text() {
			return String( this.value() )
		}

		@ $mol_action
		event_change( event?: Event ) {
			if( !event ) return null
			this.value( Number( ( event.target as HTMLInputElement ).value ) )
			return null
		}

	}

}
