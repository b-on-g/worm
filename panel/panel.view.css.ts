namespace $.$$ {

	const dot = ( color: `#${ string }` ) => ( {
		background: { color },
	} )

	const section: $mol_style_properties = {
		flex: { direction: 'column' },
		gap: '.25rem',
	}

	const title: $mol_style_properties = {
		font: { size: '.75rem', weight: 'bold' },
		letterSpacing: '.06em',
		textTransform: 'uppercase',
		color: $mol_theme.shade,
	}

	$mol_style_define( $bog_worm_panel, {
		flex: { direction: 'column', shrink: 0 },
		gap: $mol_gap.block,
		width: '15.5rem',
		padding: $mol_gap.block,
		overflow: { x: 'hidden', y: 'auto' },
		background: { color: $mol_theme.card },
		border: { right: { width: '1px', style: 'solid', color: $mol_theme.line } },

		Cells: section,
		Links: section,
		Weight: section,
		Path: section,

		Cells_title: title,
		Links_title: title,
		Weight_title: title,
		Path_title: title,

		Types: {
			flex: { direction: 'column' },
		},

		Kinds: {
			flex: { direction: 'column' },
		},

		Path_note: {
			font: { size: '.75rem' },
			color: $mol_theme.shade,
			padding: { top: '.25rem', bottom: 0, left: 0, right: 0 },
		},

		Legend: {
			flex: { direction: 'column' },
			gap: '.15rem',
			padding: { top: '.6rem', bottom: 0, left: 0, right: 0 },
			border: { top: { width: '1px', style: 'solid', color: $mol_theme.line } },
		},

		Legend_row: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '.5rem',
			font: { size: '.8rem' },
			color: $mol_theme.shade,
		},

		Legend_dot: {
			width: '.7rem',
			height: '.7rem',
			flex: { shrink: 0 },
			borderRadius: '50%',

			'@': {
				worm_type: {
					sensory: dot( $bog_worm_hue.sensory ),
					poly: dot( $bog_worm_hue.poly ),
					inter: dot( $bog_worm_hue.inter ),
					motor: dot( $bog_worm_hue.motor ),
					muscle: dot( $bog_worm_hue.muscle ),
					other: dot( $bog_worm_hue.other ),
				},
			},
		},
	} )

}
