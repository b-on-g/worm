#!/usr/bin/env node
/**
 * Downloads the raw connectome sources into ./source.
 * The files are also committed to the repository, so the build works offline.
 * Run only when you want to refresh them: `node scripts/fetch-sources.mjs`
 */

import { writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname( fileURLToPath( import.meta.url ) )
const dest = join( here, 'source' )

/** @type {Array<{ file: string, url: string, note: string }>} */
const sources = [
	{
		file: 'herm_full_edgelist.csv',
		url: 'https://raw.githubusercontent.com/openworm/c302/master/c302/data/herm_full_edgelist.csv',
		note: 'Cook et al. 2019 hermaphrodite whole-animal edge list, as republished by OpenWorm c302',
	},
	{
		file: 'owmeta_cache.json',
		url: 'https://raw.githubusercontent.com/openworm/c302/master/c302/data/owmeta_cache.json',
		note: 'Neuron function classes, neurotransmitters and receptors exported from owmeta',
	},
	{
		file: 'ganglia.json',
		url: 'https://raw.githubusercontent.com/francescorandi/wormneuroatlas/main/wormneuroatlas/data/aconnectome_ids_ganglia.json',
		note: 'Ganglion membership per neuron (WormAtlas), as packaged by wormneuroatlas',
	},
	{
		file: 'anatlas_neuron_positions.txt',
		url: 'https://raw.githubusercontent.com/francescorandi/wormneuroatlas/main/wormneuroatlas/data/anatlas_neuron_positions.txt',
		note: 'Soma coordinates from WormAtlas, as packaged by wormneuroatlas',
	},
	{
		file: 'all_cell_info.csv',
		url: 'https://raw.githubusercontent.com/openworm/ConnectomeToolbox/main/cect/data/all_cell_info.csv',
		note: 'Per-cell descriptions from WormAtlas, as packaged by OpenWorm ConnectomeToolbox',
	},
]

await mkdir( dest, { recursive: true } )

for( const source of sources ) {
	const res = await fetch( source.url )
	if( !res.ok ) throw new Error( `${ source.url } → HTTP ${ res.status }` )
	const body = Buffer.from( await res.arrayBuffer() )
	await writeFile( join( dest, source.file ), body )
	console.log( `${ source.file }\t${ body.length } bytes` )
}
