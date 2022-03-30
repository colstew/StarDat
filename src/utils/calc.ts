import { VolPlotTree } from './data-types';

export const calcVol = (dbh: number, height: number, utop: number, nf: number): number => {
  const dbhCM = dbh;
  const heightM = height;
  const utopM = utop;
  const volConstant = 0.0001570796;
  const topRadiusCM = (utopM / 2) * 100;
  const bottomRadiusCM = (dbhCM + 1) / 2;
  let vol = heightM * volConstant * (topRadiusCM ** 2 + bottomRadiusCM ** 2);
  vol *= nf / 100;
  return vol;
};

export const calcSPH = (dbh: number, baf: number): number => {
  const dbhCM = dbh;
  const rpf = 1 / (2 * Math.sqrt(baf));
  const denom = (((dbhCM * rpf) ** 2) * Math.PI);
  let sph = 0;
  if (denom !== 0) sph = 10000 / denom;
  return sph;
};

export const calcPlotVolHa = (trees: VolPlotTree[]): number => (
  trees.reduce((total, tree) => total + tree.volha, 0)
);

export const calcPlotSPH = (trees: VolPlotTree[]): number => (
  trees.reduce((total, tree) => total + tree.sph, 0)
);

export const calcAvgPiece = (trees: VolPlotTree[]): number => {
  if (trees.length === 0) return 0;
  const num = trees.reduce((total, tree) => total + tree.volume, 0);
  return num / trees.length;
};

export const calcVbar = (avgPiece: number, baf: number): number => avgPiece / baf;
