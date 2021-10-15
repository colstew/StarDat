import React from 'react';

// TODO: get species names from settings

export interface Loc {
  lat: number | null,
  lng: number | null,
}
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
  loc: Loc,
  baf: number,
  trees: SweepTrees,
  dbh: string,
  height: string,
}

export interface Plot {
  loc: Loc,
  baf: number,
  trees: VolPlotTree[],
  volhaPlot: number,
  sphPlot: number,
  pieceAvg: number,
  vbar: number,
}

interface Context {
  toggleTheme: () => void,
  isThemeDark: boolean,
  sweeps: Sweep[],
  addSweep: (sweep: Sweep) => void,
  removeSweep: (index: number)=> void,
  volplots: Plot[],
  addPlot: (plot: Plot) => void,
  removePlot: (index: number)=> void,
}
const StateContext = React.createContext<Context>({
  toggleTheme: () => undefined,
  isThemeDark: false,
  sweeps: [],
  addSweep: () => undefined,
  removeSweep: () => undefined,
  volplots: [],
  addPlot: () => undefined,
  removePlot: () => undefined,
});

export default StateContext;
