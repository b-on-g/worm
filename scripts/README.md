# Connectome converter

Turns the raw published tables in [`source/`](source) into two files under `../data`:

- `connectome.json` — the readable artefact: dataset metadata, ganglia, cells, edges
- `data.ts` — the same thing packed into strings and compiled into the app bundle

```bash
node fetch-sources.mjs   # only when you want to refresh source/, it is committed
node build-data.mjs      # writes ../data/connectome.json and ../data/data.ts
```

## Sources

Everything here is open data, committed to the repository so the build works offline.

| File | Origin | What it gives |
| --- | --- | --- |
| `herm_full_edgelist.csv` | [openworm/c302](https://raw.githubusercontent.com/openworm/c302/master/c302/data/herm_full_edgelist.csv) | Cook et al. 2019 hermaphrodite whole-animal edge list: source, target, weight, chemical or electrical |
| `owmeta_cache.json` | [openworm/c302](https://raw.githubusercontent.com/openworm/c302/master/c302/data/owmeta_cache.json) | function class (sensory / interneuron / motor), neurotransmitters and receptors per neuron, exported from owmeta 0.12.3 |
| `ganglia.json` | [francescorandi/wormneuroatlas](https://raw.githubusercontent.com/francescorandi/wormneuroatlas/main/wormneuroatlas/data/aconnectome_ids_ganglia.json) | which ganglion each neuron belongs to, after WormAtlas |
| `anatlas_neuron_positions.txt` | [francescorandi/wormneuroatlas](https://raw.githubusercontent.com/francescorandi/wormneuroatlas/main/wormneuroatlas/data/anatlas_neuron_positions.txt) | soma coordinates from WormAtlas — left-right, anterior-posterior, dorsal-ventral |
| `all_cell_info.csv` | [openworm/ConnectomeToolbox](https://raw.githubusercontent.com/openworm/ConnectomeToolbox/main/cect/data/all_cell_info.csv) | what the cell name stands for, e.g. ASHL is "Amphid Single Cilium H Left" |

Primary citation for the connectome itself:

> Cook S.J., Jarrell T.A., Brittin C.A. et al. Whole-animal connectomes of both Caenorhabditis
> elegans sexes. *Nature* **571**, 63–71 (2019). https://doi.org/10.1038/s41586-019-1352-7

## What the converter decides

- **Names.** Cook's list zero-pads the ventral cord motor neurons (`DA01`); everything else uses the
  WormAtlas spelling (`DA1`), so the padding is stripped on the way in.
- **Classes.** Derived from the name set instead of a table: drop a trailing `L`/`R` when the
  mirrored partner exists, then a trailing `D`/`V` when both a dorsal and a ventral stem exist and
  the base is at least three characters. That keeps `AVL`, `RID`, `PVR` as their own classes while
  folding `IL1DL` into `IL1`. The build fails unless this yields exactly 118 classes.
- **Types.** One function class maps straight through; two or more make the cell polymodal. `CANL`
  and `CANR` have none and stay `unknown`.
- **Ganglia.** Three neurons (`DB7`, `RMHR`, `VA11`) are missing from the ganglion table; each takes
  the majority ganglion of its own class rather than a hand-written assignment.
- **Gap junctions** are listed from both sides in the source and are collapsed into one undirected
  edge; chemical synapses stay directed.
- **Non-neuronal cells** — body wall, pharyngeal, uterine and vulval muscles, marginal cells, the
  intestine and the hypodermis — are kept, typed `muscle` or `other`, and can be filtered out.

## Validation

`build-data.mjs` exits non-zero unless the result has exactly 302 neurons in 118 classes, between
4000 and 6000 chemical synapses, between 1000 and 2500 gap junctions, at most two neurons without a
ganglion and at most 100 without a neurotransmitter. The current dataset produces 302 neurons, 118
classes, 148 muscle and other cells, 4681 chemical synapses and 1359 gap junctions.
