namespace $.$$ {

	$mol_style_define( $bog_worm_plot, {
		display: 'block',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		touchAction: 'none',
		outline: 'none',
		cursor: 'grab',
		background: { color: $mol_theme.back },

		'@': {
			worm_grabbing: {
				true: {
					cursor: 'grabbing',
				},
			},
		},
	} )

}
