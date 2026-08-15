namespace $.$$ {

	const legend_labels: Record<string, string> = {
		sensory: 'Sensory',
		poly: 'Polymodal',
		inter: 'Interneuron',
		motor: 'Motor',
		muscle: 'Muscle',
		other: 'Other cells',
	}

	/** Filters, the signal path picker and the colour legend. */
	export class $bog_worm_panel extends $.$bog_worm_panel {

		weight_title() {
			const least = this.weight_min()
			return least > 1 ? `Minimal weight — ${ least }` : 'Minimal weight — any'
		}

		path_from_suggests() {
			return $bog_worm_graph.suggest( this.path_from() )
		}

		path_to_suggests() {
			return $bog_worm_graph.suggest( this.path_to() )
		}

		@ $mol_mem
		legend() {
			return Object.keys( legend_labels ).map( type => this.Legend_row( type ) )
		}

		legend_type( type: string ) {
			return type
		}

		legend_label( type: string ) {
			return legend_labels[ type ]
		}

	}

}
