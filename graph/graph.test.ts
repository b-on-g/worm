namespace $ {

	$mol_test({

		'the dataset holds the whole hermaphrodite nervous system'() {

			const cells = $bog_worm_graph.cells()
			const neurons = cells.filter( cell => cell.type !== 'muscle' && cell.type !== 'other' )

			$mol_assert_equal( neurons.length, 302 )
			$mol_assert_ok( cells.length > neurons.length )
			$mol_assert_equal( new Set( neurons.map( cell => cell.cls ) ).size, 118 )

		},

		'synapse counts stay inside the published range'() {

			const edges = $bog_worm_graph.edges()
			const chemical = edges.filter( edge => edge.kind === 'chemical' ).length
			const gap = edges.filter( edge => edge.kind === 'gap' ).length

			$mol_assert_ok( chemical > 4000 && chemical < 6000 )
			$mol_assert_ok( gap > 1000 && gap < 2500 )
			$mol_assert_ok( edges.every( edge => edge.weight > 0 ) )

		},

		'a gap junction inside one cell is counted once'() {

			const askr = $bog_worm_graph.cell( 'ASKR' )!
			const self = askr.gap.filter( edge => edge.from === edge.to )

			$mol_assert_equal( self.length, 1 )
			$mol_assert_equal( askr.gap.filter( edge => edge === self[ 0 ] ).length, 1 )

		},

		'a neuron knows its class, ganglion and transmitters'() {

			const ash = $bog_worm_graph.cell( 'ASHL' )!

			$mol_assert_equal( ash.cls, 'ASH' )
			$mol_assert_equal( ash.type, 'sensory' )
			$mol_assert_equal( ash.ganglion, $bog_worm_graph.ganglia().indexOf( 'lateral ganglion' ) )
			$mol_assert_ok( ash.nt.includes( 'Glu' ) )

		},

		'unpaired neurons keep their own name as the class'() {

			$mol_assert_equal( $bog_worm_graph.cell( 'AVL' )!.cls, 'AVL' )
			$mol_assert_equal( $bog_worm_graph.cell( 'RID' )!.cls, 'RID' )
			$mol_assert_equal( $bog_worm_graph.cell( 'PVR' )!.cls, 'PVR' )
			$mol_assert_equal( $bog_worm_graph.cell( 'IL1DL' )!.cls, 'IL1' )
			$mol_assert_equal( $bog_worm_graph.cell( 'VA11' )!.cls, 'VA' )

		},

		'the ASH to AVA escape circuit is a direct chemical synapse'() {

			const ash = $bog_worm_graph.cell( 'ASHL' )!
			const ava = $bog_worm_graph.cell( 'AVAL' )!

			$mol_assert_ok( ash.out.some( edge => edge.to === ava.index ) )

			const paths = $bog_worm_graph.paths( ash.index, ava.index )

			$mol_assert_equal( paths.length, 1 )
			$mol_assert_equal( paths[ 0 ].length, 2 )
			$mol_assert_equal( paths[ 0 ][ 0 ], ash.index )
			$mol_assert_equal( paths[ 0 ][ 1 ], ava.index )

		},

		'signal paths reach the body wall muscles through motor neurons'() {

			const ash = $bog_worm_graph.cell( 'ASHL' )!
			const muscle = $bog_worm_graph.cell( 'dBWML8' )!

			const paths = $bog_worm_graph.paths( ash.index, muscle.index )

			$mol_assert_ok( paths.length > 0 )
			$mol_assert_ok( paths.every( path => path.length <= 6 ) )
			$mol_assert_ok( paths.every( path => path[ path.length - 1 ] === muscle.index ) )

			const cells = $bog_worm_graph.cells()
			for( const path of paths ) {
				for( let step = 1 ; step < path.length ; ++step ) {
					$mol_assert_ok( cells[ path[ step - 1 ] ].out.some( edge => edge.to === path[ step ] ) )
				}
			}

		},

		'unreachable targets give no paths'() {

			const muscle = $bog_worm_graph.cell( 'dBWML8' )!
			const ash = $bog_worm_graph.cell( 'ASHL' )!

			$mol_assert_equal( $bog_worm_graph.paths( muscle.index, ash.index ).length, 0 )
			$mol_assert_equal( $bog_worm_graph.paths( ash.index, ash.index ).length, 0 )

		},

		'both layouts fill the unit square'() {

			for( const layout of [ $bog_worm_graph.layered(), $bog_worm_graph.forced() ] ) {
				$mol_assert_equal( layout.xs.length, $bog_worm_graph.cells().length )
				$mol_assert_ok( layout.xs.every( value => value >= 0 && value <= 1 ) )
				$mol_assert_ok( layout.ys.every( value => value >= 0 && value <= 1 ) )
			}

		},

		'the layered layout puts sensory cells left of motor cells'() {

			const cells = $bog_worm_graph.cells()
			const layout = $bog_worm_graph.layered()

			const column = ( type: $bog_worm_type ) => {
				const found = cells.filter( cell => cell.type === type )
				return layout.xs[ found[ 0 ].index ]
			}

			$mol_assert_ok( column( 'sensory' ) < column( 'inter' ) )
			$mol_assert_ok( column( 'inter' ) < column( 'motor' ) )
			$mol_assert_ok( column( 'motor' ) < column( 'muscle' ) )

		},

	})

}
