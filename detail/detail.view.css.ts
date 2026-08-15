namespace $.$$ {

	$mol_style_define( $bog_worm_detail, {
		flex: { direction: 'column', shrink: 0 },
		width: '19rem',
		background: { color: $mol_theme.card },
		border: { left: { width: '1px', style: 'solid', color: $mol_theme.line } },

		Head: {
			flex: { direction: 'column' },
			gap: '.15rem',
			padding: $mol_gap.block,
			border: { bottom: { width: '1px', style: 'solid', color: $mol_theme.line } },
		},

		Name: {
			font: { size: '1.1rem', weight: 'bold' },
		},

		Facts: {
			font: { size: '.8rem' },
			color: $mol_theme.shade,
		},

		Close: {
			align: { self: 'flex-start' },
			margin: { top: '.35rem', bottom: 0, left: 0, right: 0 },
		},

		List: {
			flex: { grow: 1, direction: 'column' },
			overflow: { x: 'hidden', y: 'auto' },
		},

		Section: {
			padding: { top: '.6rem', bottom: '.2rem', left: $mol_gap.block, right: $mol_gap.block },
			font: { size: '.72rem', weight: 'bold' },
			letterSpacing: '.06em',
			textTransform: 'uppercase',
			color: $mol_theme.shade,
		},

		Row: {
			flex: { direction: 'row' },
			align: { items: 'baseline' },
			gap: '.5rem',
			padding: { top: '.2rem', bottom: '.2rem', left: $mol_gap.block, right: $mol_gap.block },
			minHeight: 'auto',
			justify: { content: 'flex-start' },
		},

		Row_peer: {
			font: { family: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
			flex: { shrink: 0 },
		},

		Row_note: {
			font: { size: '.72rem' },
			color: $mol_theme.shade,
			flex: { grow: 1 },
		},

		Row_weight: {
			font: { size: '.8rem' },
			color: $mol_theme.shade,
			margin: { left: 'auto', top: 0, bottom: 0, right: 0 },
		},
	} )

}
