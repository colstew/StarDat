import UTMLocation from './utm-location';

export interface SweepTrees {
  [index: string]: number,
}

export interface VolPlotTree {
  species: string,
  dbh: string,
  height: string,
  nf: string,
  volume: string
}

export interface Sweep {
  readonly location: UTMLocation,
  readonly baf: number,
  readonly trees: SweepTrees,
  readonly dbh: number,
  readonly height: number,
}

export interface Plot {
  readonly location: UTMLocation,
  readonly baf: number,
  readonly trees: VolPlotTree[],
  readonly volhaPlot: number,
  readonly sphPlot: number,
  readonly pieceAvg: number,
  readonly vbar: number,
}
