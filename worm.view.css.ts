namespace $.$$ {

	$mol_style_define( $bog_worm, {
		flex: { direction: 'column' },
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		background: { color: $mol_theme.back },
		color: $mol_theme.text,

		Head: {
			flex: { direction: 'row', wrap: 'wrap', shrink: 0 },
			align: { items: 'center' },
			gap: $mol_gap.space,
			padding: { top: '.4rem', bottom: '.4rem', left: '.75rem', right: '.75rem' },
			background: { color: $mol_theme.card },
			border: { bottom: { width: '1px', style: 'solid', color: $mol_theme.line } },
		},

		Brand: {
			flex: { direction: 'column', grow: 1 },
			minWidth: '10rem',
		},

		Count: {
			font: { size: '.75rem' },
			color: $mol_theme.shade,
		},

		Search: {
			flex: { grow: 1 },
			minWidth: '11rem',
			maxWidth: '22rem',
		},

		Layout: {
			minWidth: '9rem',
		},

		Stage: {
			flex: { direction: 'row', grow: 1, shrink: 1, basis: 0 },
			position: 'relative',
			minWidth: 0,
			minHeight: 0,
			overflow: 'hidden',
		},

		Board: {
			flex: { direction: 'column', grow: 1, shrink: 1, basis: 0 },
			position: 'relative',
			minWidth: 0,
			minHeight: 0,
			overflow: 'hidden',
		},

		Tip: {
			position: 'absolute',
			zIndex: 3,
			maxWidth: '17rem',
			padding: { top: '.35rem', bottom: '.35rem', left: '.55rem', right: '.55rem' },
			background: { color: $mol_theme.card },
			border: { width: '1px', style: 'solid', color: $mol_theme.line, radius: $mol_gap.round },
			box: { shadow: [ { x: 0, y: '2px', blur: '10px', spread: 0, color: '#00000033' } ] },
			font: { size: '.8rem' },
			lineHeight: '1.25rem',
			whiteSpace: 'pre-line',
			pointerEvents: 'none',
		},

		Foot: {
			flex: { direction: 'row', wrap: 'wrap', shrink: 0 },
			align: { items: 'center' },
			gap: '.3rem',
			padding: { top: '.3rem', bottom: '.3rem', left: '.75rem', right: '.75rem' },
			font: { size: '.72rem' },
			color: $mol_theme.shade,
			background: { color: $mol_theme.card },
			border: { top: { width: '1px', style: 'solid', color: $mol_theme.line } },
		},

		// too narrow to keep the panels beside the canvas — float them above it
		'@': {
			worm_layout: {
				narrow: {
					Aside: {
						position: 'absolute',
						zIndex: 6,
						top: 0,
						left: 0,
						height: '100%',
						background: { color: $mol_theme.back },
						box: { shadow: [ { x: '2px', y: 0, blur: '16px', spread: 0, color: '#00000044' } ] },
					},
					Links: {
						position: 'absolute',
						zIndex: 5,
						top: 0,
						right: 0,
						height: '100%',
						maxWidth: '82%',
						background: { color: $mol_theme.back },
						box: { shadow: [ { x: '-2px', y: 0, blur: '16px', spread: 0, color: '#00000044' } ] },
					},
				},
			},
		},
	} )

}
