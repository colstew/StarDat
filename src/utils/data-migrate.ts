import XLSX from 'xlsx';
import { StorageAccessFramework } from 'expo-file-system';
import * as FileSystem from 'expo-file-system';
import moment from 'moment';
import {
  Plot, Sweep, SweepTrees, VolPlotTree, UTMLocation,
} from './data-types';

// order sensitive
const sweepHeadings = {
  zone: 'UTM Zone',
  easting: 'Easting',
  northing: 'Northing',
  baf: 'BAF',
  dbh: 'DBH',
  ht: 'HT',
};

const plotHeadings = {
  plotData: {
    plotNumber: 'Plot#',
    baf: 'Prism:',
    utop: 'U-Top(m):',
    const: 'Constant:',
  },
  treeData: {
    tree: 'Tree#',
    spp: 'SPP',
    dbh: 'DBH',
    utopHt: 'U-Top Ht',
    nf: 'NF',
    volTree: 'Vol/Tree',
    volHa: 'Vol/ha',
    sph: 'SPH',
  },
  plotTotals: 'Plot Totals:',
  location: 'Location:',
  avgPS: 'Avg Piece Size:',
  vbar: 'VBAR:',
};

/*
    helper functions
*/

function genFileNames(block: string, user: string) {
  let blockDash = '';
  let userDash = '';
  if (block) blockDash = '-';
  if (user) userDash = '-';
  const date = moment().format('YYYY-MM-DD');
  const sweepFilename = `${block}${blockDash}${user}${userDash}Sweeps${date}`;
  const plotFilename = `${block}${blockDash}${user}${userDash}VolPlots${date}`;
  return [sweepFilename, plotFilename];
}

function formatSweepData(data: unknown): Sweep[] {
  if (!data || !Array.isArray(data)) return [];
  const expectedHeadings = Object.values(sweepHeadings);

  const sweeps = data.reduce((result, currentItem) => {
    if (!currentItem || typeof currentItem !== 'object') return result;
    const foundHeadings = Object.keys(currentItem);
    const hasKeys = expectedHeadings.every((heading) => foundHeadings.includes(heading));
    if (!hasKeys) return result;

    const location: UTMLocation = {
      zone: String(currentItem[sweepHeadings.zone]),
      easting: Number(currentItem[sweepHeadings.easting]),
      northing: Number(currentItem[sweepHeadings.northing]),
    };

    const trees: SweepTrees = Object.keys(currentItem).reduce((previous, currentKey) => {
      const next = previous;
      if (!expectedHeadings.includes(currentKey)) {
        next[currentKey] = Number(currentItem[currentKey]);
      }
      return next;
    }, {} as SweepTrees);

    const sweep: Sweep = {
      baf: Number(currentItem[sweepHeadings.baf]),
      dbh: Number(currentItem[sweepHeadings.dbh]),
      height: Number(currentItem[sweepHeadings.ht]),
      location,
      trees,
    };
    result.push(sweep);
    return result;
  }, []);
  return sweeps;
}

function sheetToPlot(sheet: unknown[][]): Plot | null {
  const n = sheet.length;
  if (sheet[0][0] !== plotHeadings.plotData.plotNumber) return null;
  if (sheet[0][2] !== plotHeadings.plotData.baf) return null;
  if (sheet[0][3] === undefined) return null;
  if (sheet[0][4] !== plotHeadings.plotData.utop) return null;
  if (sheet[0][5] === undefined) return null;
  if (sheet[1][0] !== plotHeadings.treeData.tree) return null;
  if (sheet[1][1] !== plotHeadings.treeData.spp) return null;
  if (sheet[1][2] !== plotHeadings.treeData.dbh) return null;
  if (sheet[1][3] !== plotHeadings.treeData.utopHt) return null;
  if (sheet[1][4] !== plotHeadings.treeData.nf) return null;
  if (sheet[1][5] !== plotHeadings.treeData.volTree) return null;
  if (sheet[1][6] !== plotHeadings.treeData.volHa) return null;
  if (sheet[1][7] !== plotHeadings.treeData.sph) return null;
  if (sheet[n - 2][5] !== plotHeadings.plotTotals) return null;
  if (sheet[n - 2][6] === undefined) return null;
  if (sheet[n - 2][7] === undefined) return null;
  if (sheet[n - 1][0] !== plotHeadings.location) return null;
  if (sheet[n - 1][1] === undefined) return null;
  if (sheet[n - 1][2] === undefined) return null;
  if (sheet[n - 1][3] === undefined) return null;
  if (sheet[n - 1][4] !== plotHeadings.avgPS) return null;
  if (sheet[n - 1][5] === undefined) return null;
  if (sheet[n - 1][6] !== plotHeadings.vbar) return null;
  if (sheet[n - 1][7] === undefined) return null;

  const location: UTMLocation = {
    zone: String(sheet[n - 1][1]),
    easting: Number(sheet[n - 1][2]),
    northing: Number(sheet[n - 1][3]),
  };

  const trees = sheet.slice(2, -2).reduce((result: VolPlotTree[], currentRow) => {
    for (let i = 1; i < 8; i += 1) {
      if (!currentRow[i]) return result;
    }
    const species = String(currentRow[1]);
    const dbh = Number(currentRow[2]);
    const height = Number(currentRow[3]);
    const nf = Number(currentRow[4]);
    const volume = Number(currentRow[5]);
    const sph = Number(currentRow[6]);
    const volha = Number(currentRow[7]);
    const tree: VolPlotTree = {
      species,
      dbh,
      height,
      nf,
      volume,
      sph,
      volha,
    };
    result.push(tree);
    return result;
  }, [] as VolPlotTree[]);

  const plot = {
    baf: Number(sheet[0][3]),
    utop: Number(sheet[0][5]),
    trees,
    location,
    plotVolHa: Number(sheet[n - 2][6]),
    plotSPH: Number(sheet[n - 2][7]),
    avgPiece: Number(sheet[n - 1][5]),
    vbar: Number(sheet[n - 1][7]),
  };
  return plot;
}

function formatPlotData(data: unknown[][][]): Plot[] {
  const plots = data.reduce((result: Plot[], currentSheet) => {
    if (!Array.isArray(data)) return result;
    const foundPlot = sheetToPlot(currentSheet);
    if (foundPlot) result.push(foundPlot);
    return result;
  }, [] as Plot[]);
  return plots;
}

/*
    export functions
*/

export async function exportSweeps(
  sweeps: Sweep[],
  species: string[],
  dirUri: string,
  block: string,
  user: string,
): Promise<void> {
  const data: (string|number)[][] = [[...Object.values(sweepHeadings), ...species]];
  sweeps.map((sweep) => data.push([
    sweep.location.zone,
    sweep.location.easting,
    sweep.location.northing,
    sweep.baf,
    sweep.dbh,
    sweep.height,
    ...species.map((name) => sweep.trees[name]),
  ]));
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Sweeps');
  const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
  const [filename] = genFileNames(block, user);
  let newFileUri = null;
  try {
    if (dirUri) {
      newFileUri = await StorageAccessFramework.createFileAsync(
        dirUri,
        filename,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
    }
    if (newFileUri) {
      await StorageAccessFramework.writeAsStringAsync(
        newFileUri,
        wbout,
        { encoding: FileSystem.EncodingType.Base64 },
      );
    }
  } catch (e) {
    console.error(e);
    // add error handling
  }
}

export async function exportVolPlots(
  plots: Plot[],
  dirUri: string,
  block: string,
  user: string,
): Promise<void> {
  const wb = XLSX.utils.book_new();
  plots.forEach((plot, index) => {
    const data = [
      ['Plot#', index + 1, 'Prism:', plot.baf, 'U-Top(m):', plot.utop, 'Constant:', 0.0001570796],
      ['Tree#', 'SPP', 'DBH', 'U-Top Ht', 'NF', 'Vol/Tree', 'Vol/ha', 'SPH'],
      ...plot.trees.map((tree, idx) => [
        idx + 1,
        tree.species,
        tree.dbh,
        tree.height,
        tree.nf,
        tree.volume,
        tree.volha,
        tree.sph,
      ]),
      [null, null, null, null, null, 'Plot Totals:', plot.plotVolHa, plot.plotSPH],
      ['Location:', plot.location.zone, plot.location.easting, plot.location.northing,
        'Avg Piece Size:', plot.avgPiece, 'VBAR:', plot.vbar],
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, `Plot# ${index + 1}`);
  });
  const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
  const [, filename] = genFileNames(block, user);
  let newFileUri = null;
  try {
    if (dirUri) {
      newFileUri = await StorageAccessFramework.createFileAsync(
        dirUri,
        filename,
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      );
    }
    if (newFileUri) {
      await StorageAccessFramework.writeAsStringAsync(
        newFileUri,
        wbout,
        { encoding: FileSystem.EncodingType.Base64 },
      );
    }
  } catch (e) {
    console.error(e);
    // add error handling
  }
}

export async function importSweeps(
  fileUri: string,
): Promise<Sweep[]> {
  try {
    const fileString = await StorageAccessFramework.readAsStringAsync(
      fileUri,
      { encoding: FileSystem.EncodingType.Base64 },
    );
    const wb = XLSX.read(fileString, { type: 'base64' });
    const firstSheetName = wb.SheetNames[0];
    const sheet = wb.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(sheet);
    const sweeps = formatSweepData(data);
    return sweeps;
  } catch (e) {
    console.error(e);
    // handle error
    return [];
  }
}

export async function importVolPlots(
  fileUri: string,
): Promise<Plot[]> {
  try {
    const fileString = await StorageAccessFramework.readAsStringAsync(
      fileUri,
      { encoding: FileSystem.EncodingType.Base64 },
    );
    const wb = XLSX.read(fileString, { type: 'base64' });
    // const sheetNames = wb.SheetNames;
    const sheets = wb.SheetNames.map((name) => wb.Sheets[name]);
    const data = sheets.map((sheet) => XLSX.utils.sheet_to_json<unknown[]>(
      sheet, { header: 1, blankrows: false },
    ));
    const plots = formatPlotData(data);
    return plots;
  } catch (e) {
    console.error(e);
    // handle error
    return [];
  }
}
