export interface SweepTrees {
  [index: string]: number,
}

export interface TreeNames {
  [index: string]: string,
}

export interface UTMLocation {
  readonly zone: string;
  readonly easting: number;
  readonly northing: number;
}
export interface VolPlotTree {
  readonly species: string,
  readonly dbh: number,
  readonly height: number,
  readonly nf: number,
  readonly volume: number,
  readonly sph: number
  readonly volha: number
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
  readonly utop: number,
  readonly plotVolHa: number,
  readonly plotSPH: number,
  readonly avgPiece: number,
  readonly vbar: number,
}
