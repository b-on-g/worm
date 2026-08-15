#!/usr/bin/env node
/**
 * Converts the raw connectome sources in ./source into
 *
 *   ../data/connectome.json  — readable artefact, one object, documented in scripts/README.md
 *   ../data/data.ts          — the same data packed into strings and compiled into the bundle
 *
 * Run: `node scripts/build-data.mjs`
 */

import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * @typedef {'sensory'|'inter'|'motor'|'poly'|'unknown'|'muscle'|'other'} Cell_type
 * @typedef {{ id: string, class: string, type: Cell_type, ganglion: string, nt: string[], title: string, ap: number|null, dv: number|null }} Cell
 * @typedef {{ from: number, to: number, kind: 'chemical'|'gap', weight: number }} Edge
 */

const here = dirname( fileURLToPath( import.meta.url ) )
const src = join( here, 'source' )
const out = join( here, '..', 'data' )

const dataset = {
	id: 'cook2019',
	title: 'Cook et al. 2019 — hermaphrodite whole-animal connectome',
	citation: 'Cook S.J. et al. Whole-animal connectomes of both Caenorhabditis elegans sexes. Nature 571, 63–71 (2019)',
	doi: 'https://doi.org/10.1038/s41586-019-1352-7',
	source: 'https://github.com/openworm/c302/blob/master/c302/data/herm_full_edgelist.csv',
}

// Ganglia ordered anterior → posterior, then the non-neuronal groups.
const ganglia_order = [
	'anterior pharyngeal bulb',
	'anterior ganglion',
	'dorsal ganglion',
	'lateral ganglion',
	'ventral ganglion',
	'posterior pharyngeal bulb',
	'retrovesicular ganglion',
	'ventral nerve cord',
	'midbody neurons',
	'preanal ganglion',
	'dorsorectal ganglion',
	'lumbar ganglion',
	'unassigned',
	'pharyngeal muscle',
	'pharyngeal marginal cell',
	'head muscle',
	'body wall muscle',
	'uterine muscle',
	'vulval muscle',
	'anal and sphincter muscle',
	'intestinal muscle',
	'other tissue',
]

/** Cook's edge list zero-pads ventral cord motor neurons: DA01 → DA1. */
const unpad = ( /** @type {string} */ name ) =>
	name.trim().replace( /^(AS|DA|DB|DD|VA|VB|VC|VD)0(\d)$/, '$1$2' )

const vnc_classes = new Set( [ 'AS', 'DA', 'DB', 'DD', 'VA', 'VB', 'VC', 'VD' ] )

/**
 * Neuron class = the name without its positional suffix.
 * Derived from the name set itself instead of a hand-written table:
 *   1. ventral cord motor neurons are numbered, not lettered — DA9 → DA
 *   2. drop a trailing L/R when the mirrored partner exists — ASHL → ASH, but AVL stays AVL
 *   3. drop a trailing D/V when both dorsal and ventral stems exist — CEPDL → CEPD → CEP,
 *      while RID keeps its D because "RI" is a two-letter stem, not a class
 * @param {string[]} names
 * @returns {Map<string,string>}
 */
function derive_classes( names ) {
	const all = new Set( names )
	const stem = new Map()

	for( const name of names ) {
		const vnc = /^([A-Z]{2})(\d{1,2})$/.exec( name )
		if( vnc && vnc_classes.has( vnc[ 1 ] ) ) { stem.set( name, vnc[ 1 ] ); continue }

		const side = /^(.+)([LR])$/.exec( name )
		const mirror = side && side[ 1 ] + ( side[ 2 ] === 'L' ? 'R' : 'L' )
		stem.set( name, mirror && all.has( mirror ) ? side[ 1 ] : name )
	}

	const stems = new Set( stem.values() )
	const collapse = ( /** @type {string} */ value ) => {
		const axis = /^(.{3,})([DV])$/.exec( value )
		if( !axis ) return value
		const other = axis[ 1 ] + ( axis[ 2 ] === 'D' ? 'V' : 'D' )
		return stems.has( other ) ? axis[ 1 ] : value
	}

	return new Map( [ ...stem ].map( ( [ name, value ] ) => [ name, collapse( value ) ] ) )
}

/** @param {string[]} kinds */
function neuron_type( kinds ) {
	const known = kinds.filter( kind => kind !== 'unknown' )
	if( known.length === 0 ) return /** @type {Cell_type} */ ( 'unknown' )
	if( known.length > 1 ) return /** @type {Cell_type} */ ( 'poly' )
	if( known[ 0 ] === 'interneuron' ) return /** @type {Cell_type} */ ( 'inter' )
	return /** @type {Cell_type} */ ( known[ 0 ] === 'sensory' ? 'sensory' : 'motor' )
}

const nt_short = {
	Acetylcholine: 'ACh',
	Glutamate: 'Glu',
	GABA: 'GABA',
	Serotonin: '5-HT',
	Dopamine: 'DA',
	Octopamine: 'Oct',
	Tyramine: 'Tyr',
}

/** Non-neuronal cells of the Cook edge list, grouped the way WormAtlas groups them. */
function tissue( /** @type {string} */ id ) {
	if( /^[dv]BWM[LR]\d+$/.test( id ) ) return { type: 'muscle', ganglion: 'body wall muscle', cls: id.replace( /\d+$/, '' ) }
	if( /^pm\d/.test( id ) ) return { type: 'muscle', ganglion: 'pharyngeal muscle', cls: /^(pm\d+)/.exec( id )[ 1 ] }
	if( /^mc\d/.test( id ) ) return { type: 'other', ganglion: 'pharyngeal marginal cell', cls: /^(mc\d+)/.exec( id )[ 1 ] }
	if( /^um\d/.test( id ) ) return { type: 'muscle', ganglion: 'uterine muscle', cls: /^(um\d+)/.exec( id )[ 1 ] }
	if( /^vm\d/.test( id ) ) return { type: 'muscle', ganglion: 'vulval muscle', cls: /^(vm\d+)/.exec( id )[ 1 ] }
	if( id === 'anal' || id === 'sph' ) return { type: 'muscle', ganglion: 'anal and sphincter muscle', cls: id }
	if( id === 'intL' || id === 'intR' ) return { type: 'muscle', ganglion: 'intestinal muscle', cls: 'int' }
	return { type: 'other', ganglion: 'other tissue', cls: id }
}

/** @param {string} text */
function parse_csv( text ) {
	const lines = text.split( /\r?\n/ ).filter( line => line.trim() )
	const head = lines[ 0 ].split( ',' ).map( cell => cell.trim() )
	return lines.slice( 1 ).map( line => {
		const cells = split_row( line )
		return Object.fromEntries( head.map( ( key, index ) => [ key, ( cells[ index ] ?? '' ).trim() ] ) )
	} )
}

/** Minimal RFC4180 row splitter — all_cell_info.csv quotes fields containing commas. */
function split_row( /** @type {string} */ line ) {
	const cells = []
	let cell = ''
	let quoted = false
	for( let i = 0 ; i < line.length ; ++i ) {
		const char = line[ i ]
		if( quoted ) {
			if( char !== '"' ) { cell += char; continue }
			if( line[ i + 1 ] === '"' ) { cell += '"'; ++i; continue }
			quoted = false
		}
		else if( char === '"' ) quoted = true
		else if( char === ',' ) { cells.push( cell ); cell = '' }
		else cell += char
	}
	cells.push( cell )
	return cells
}

// ---------------------------------------------------------------- read sources

const owmeta = JSON.parse( await readFile( join( src, 'owmeta_cache.json' ), 'utf8' ) )
const ganglia = JSON.parse( await readFile( join( src, 'ganglia.json' ), 'utf8' ) )
const cell_info = parse_csv( await readFile( join( src, 'all_cell_info.csv' ), 'utf8' ) )
const edge_rows = parse_csv( await readFile( join( src, 'herm_full_edgelist.csv' ), 'utf8' ) )

const position_lines = ( await readFile( join( src, 'anatlas_neuron_positions.txt' ), 'utf8' ) ).split( /\r?\n/ )
const position_names = position_lines[ 0 ].replace( /^#/, '' ).trim().split( /\s+/ )
const positions = new Map( position_lines.slice( 1 ).filter( line => line.trim() ).map( ( line, index ) => {
	const [ lr, ap, dv ] = line.trim().split( /\s+/ ).map( Number )
	return [ position_names[ index ], { lr, ap, dv } ]
} ) )

const ganglion_of = new Map()
for( const [ name, members ] of Object.entries( ganglia ) ) {
	if( !ganglia_order.includes( name ) ) continue // 'head' and 'pharynx' list ganglia, not cells
	for( const member of members ) ganglion_of.set( member, name )
}

const title_of = new Map( cell_info.map( row => [ row[ 'Cell name' ], row[ 'Name details' ] ] ) )

/**
 * A handful of neurons are absent from the ganglion table (DB7, RMHR, VA11).
 * Their siblings of the same class share one ganglion, so take the majority vote there
 * instead of hand-writing the assignment.
 * @param {string} id
 * @param {Map<string,string>} classes
 */
function ganglion_for( id, classes ) {
	const known = ganglion_of.get( id )
	if( known ) return known

	const votes = new Map()
	for( const [ other, cls ] of classes ) {
		if( cls !== classes.get( id ) || other === id ) continue
		const ganglion = ganglion_of.get( other )
		if( ganglion ) votes.set( ganglion, ( votes.get( ganglion ) ?? 0 ) + 1 )
	}

	const best = [ ...votes ].sort( ( a, b ) => b[ 1 ] - a[ 1 ] )[ 0 ]
	return best ? best[ 0 ] : 'unassigned'
}

// ---------------------------------------------------------------- build cells

const neuron_names = Object.keys( owmeta.neuron_info )
const classes = derive_classes( neuron_names )

/** @type {Cell[]} */
const cells = []
const index_of = new Map()

const add = ( /** @type {Cell} */ cell ) => {
	index_of.set( cell.id, cells.length )
	cells.push( cell )
}

for( const id of neuron_names ) {
	const info = owmeta.neuron_info[ id ]
	const pos = positions.get( id )
	add( {
		id,
		class: classes.get( id ),
		type: neuron_type( info[ 1 ] ),
		ganglion: ganglion_for( id, classes ),
		nt: info[ 3 ].map( name => nt_short[ name ] ?? name ),
		title: title_of.get( id ) ?? '',
		ap: pos ? Number( pos.ap.toFixed( 3 ) ) : null,
		dv: pos ? Number( pos.dv.toFixed( 3 ) ) : null,
	} )
}

const edge_cells = new Set()
for( const row of edge_rows ) {
	edge_cells.add( unpad( row.Source ) )
	edge_cells.add( unpad( row.Target ) )
}

for( const id of [ ...edge_cells ].filter( id => !index_of.has( id ) ).sort() ) {
	const group = tissue( id )
	add( {
		id,
		class: group.cls,
		type: /** @type {Cell_type} */ ( group.type ),
		ganglion: group.ganglion,
		nt: [],
		title: title_of.get( id ) ?? '',
		ap: null,
		dv: null,
	} )
}

// ---------------------------------------------------------------- build edges

/** @type {Map<string,Edge>} */
const chemical = new Map()
/** @type {Map<string,Edge>} */
const gap = new Map()

for( const row of edge_rows ) {
	const from = index_of.get( unpad( row.Source ) )
	const to = index_of.get( unpad( row.Target ) )
	const weight = Number( row.Weight )
	if( from === undefined || to === undefined ) throw new Error( `unknown cell in edge ${ row.Source } → ${ row.Target }` )
	if( !Number.isFinite( weight ) || weight <= 0 ) throw new Error( `bad weight in edge ${ row.Source } → ${ row.Target }` )

	if( row.Type === 'chemical' ) {
		const key = `${ from }>${ to }`
		const prev = chemical.get( key )
		if( prev ) prev.weight += weight
		else chemical.set( key, { from, to, kind: 'chemical', weight } )
	}
	else {
		// gap junctions are symmetric and listed from both sides — keep one entry
		const key = from < to ? `${ from }-${ to }` : `${ to }-${ from }`
		const prev = gap.get( key )
		if( prev ) prev.weight = Math.max( prev.weight, weight )
		else gap.set( key, { from: Math.min( from, to ), to: Math.max( from, to ), kind: 'gap', weight } )
	}
}

const edges = [ ...chemical.values(), ...gap.values() ]

// ---------------------------------------------------------------- validate

const problems = []
const neurons = cells.filter( cell => ![ 'muscle', 'other' ].includes( cell.type ) )

if( neurons.length !== 302 ) problems.push( `expected 302 neurons, got ${ neurons.length }` )

const class_count = new Set( neurons.map( cell => cell.class ) ).size
if( class_count !== 118 ) problems.push( `expected 118 neuron classes, got ${ class_count }` )

const unassigned = neurons.filter( cell => cell.ganglion === 'unassigned' ).map( cell => cell.id )
if( unassigned.length > 2 ) problems.push( `${ unassigned.length } neurons without a ganglion: ${ unassigned.join( ', ' ) }` )

if( chemical.size < 4000 || chemical.size > 6000 ) problems.push( `chemical synapse count out of published range: ${ chemical.size }` )
if( gap.size < 1000 || gap.size > 2500 ) problems.push( `gap junction count out of published range: ${ gap.size }` )

const nt_missing = neurons.filter( cell => cell.nt.length === 0 ).length
if( nt_missing > 100 ) problems.push( `${ nt_missing } neurons without a neurotransmitter` )

if( problems.length ) {
	for( const problem of problems ) console.error( `! ${ problem }` )
	process.exit( 1 )
}

// ---------------------------------------------------------------- write

const ganglia_used = ganglia_order.filter( name => cells.some( cell => cell.ganglion === name ) )

const json = {
	dataset,
	generated_from: 'scripts/source, see scripts/README.md',
	ganglia: ganglia_used,
	cells,
	edges: edges.map( edge => ( { from: cells[ edge.from ].id, to: cells[ edge.to ].id, kind: edge.kind, weight: edge.weight } ) ),
}

await writeFile( join( out, 'connectome.json' ), JSON.stringify( json, null, '\t' ) + '\n' )

const b36 = ( /** @type {number} */ value ) => value.toString( 36 )

const type_code = { sensory: 's', inter: 'i', motor: 'm', poly: 'p', unknown: 'u', muscle: 'M', other: 'o' }

const cells_packed = cells.map( cell => [
	cell.id,
	cell.class,
	type_code[ cell.type ],
	b36( ganglia_used.indexOf( cell.ganglion ) ),
	cell.nt.join( ' ' ),
	cell.ap === null ? '' : cell.ap,
	cell.dv === null ? '' : cell.dv,
	cell.title,
].join( ',' ) ).join( '\n' )

const pack_edges = ( /** @type {Edge[]} */ list ) =>
	list.map( edge => `${ b36( edge.from ) },${ b36( edge.to ) },${ b36( edge.weight ) }` ).join( ';' )

const ts = `namespace $ {

	/**
	 * Generated by scripts/build-data.mjs — do not edit by hand.
	 * ${ dataset.citation }
	 */
	export const $bog_worm_data = {

		dataset: ${ JSON.stringify( dataset, null, '\t' ).replace( /\n/g, '\n\t\t' ) },

		/** Ganglia and tissue groups, ordered anterior to posterior. */
		ganglia: ${ JSON.stringify( ganglia_used ) },

		/** id, class, type, ganglion index, neurotransmitters, anterior-posterior, dorsal-ventral, full name */
		cells: ${ JSON.stringify( cells_packed ) },

		/** source index, target index, synapse count — all base 36 */
		chemical: ${ JSON.stringify( pack_edges( [ ...chemical.values() ] ) ) },

		/** cell index, cell index, contact count — all base 36 */
		gap: ${ JSON.stringify( pack_edges( [ ...gap.values() ] ) ) },

	}

}
`

await writeFile( join( out, 'data.ts' ), ts )

console.log( `cells      ${ cells.length } (${ neurons.length } neurons, ${ cells.length - neurons.length } muscle and other cells)` )
console.log( `classes    ${ class_count }` )
console.log( `chemical   ${ chemical.size }` )
console.log( `gap        ${ gap.size }` )
console.log( `data.ts    ${ ts.length } bytes` )
