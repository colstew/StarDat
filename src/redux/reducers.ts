import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Sweep, Plot, TreeNames } from '../utils/data-types';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    sweeps: [] as Sweep[],
    volplots: [] as Plot[],
  },
  reducers: {
    addSweep: (state, action: PayloadAction<Sweep | Sweep[]>) => {
      const sweep = action.payload;
      state.sweeps = state.sweeps.concat(sweep);
    },
    removeSweep: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.sweeps.splice(index, 1);
    },
    addVolPlot: (state, action: PayloadAction<Plot | Plot[]>) => {
      const plot = action.payload;
      state.volplots = state.volplots.concat(plot);
    },
    removeVolPlot: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.volplots.splice(index, 1);
    },
    clearSweeps: (state) => {
      state.sweeps = [];
    },
    clearVolPlots: (state) => {
      state.volplots = [];
    },
    clearAll: (state) => {
      state.sweeps = [];
      state.volplots = [];
    },
  },
});

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    darkMode: false,
    exportDir: '',
    baf: 8,
    utop: 0.125,
    blockName: '',
    userName: '',
    defaultNF: 99,
    speciesNames: {
      S: 'Spruce',
      F: 'Fir',
      B: 'Balsam',
      H: 'Hemlock',
      C: 'Cedar',
    } as TreeNames,
    speciesNumbers: ['75', '175', '375', '575', '875'],
  },
  reducers: {
    setBAF: (state, action: PayloadAction<number>) => {
      state.baf = action.payload;
    },
    setUTop: (state, action: PayloadAction<number>) => {
      state.utop = action.payload;
    },
    setBlockName: (state, action: PayloadAction<string>) => {
      state.blockName = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setDefaultNF: (state, action: PayloadAction<number>) => {
      state.defaultNF = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setExportDir: (state, action: PayloadAction<string>) => {
      state.exportDir = action.payload;
    },
  },
});

export const dataReducer = dataSlice.reducer;
export const settingsReducer = settingsSlice.reducer;
export const {
  addSweep,
  removeSweep,
  addVolPlot,
  removeVolPlot,
  clearSweeps,
  clearVolPlots,
  clearAll,
} = dataSlice.actions;
export const {
  setBAF,
  setUTop,
  setBlockName,
  setUserName,
  setDefaultNF,
  toggleDarkMode,
  setExportDir,
} = settingsSlice.actions;
