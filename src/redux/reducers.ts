import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Sweep, Plot } from '../utils/data-types';

/*
const storeLocal = async (key: string, value: Sweep[] | Plot[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // TODO: log error
    // saving error
  }
};

export const localSweepsRetrieve = async (): Promise<void> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@sweeps');
    setSweeps(jsonValue != null ? JSON.parse(jsonValue) : []);
  } catch (e) {
    // TODO: log error
    // read error
  }
};

export const localVolPlotRetrieve = async (): Promise<void> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@volplots');
    setVolPlots(jsonValue != null ? JSON.parse(jsonValue) : []);
  } catch (e) {
    // TODO: log error
    // read error
  }
};
*/

export const sweepsSlice = createSlice({
  name: 'sweeps',
  initialState: [] as Sweep[],
  reducers: {
    addSweep: (state, action: PayloadAction<Sweep>) => {
      const sweep = action.payload;
      state.push(sweep);
      // TODO: store local
    },
    removeSweep: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.splice(index, 1);
      // TODO: store local
    },
    clearSweeps: (state) => {
      // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unused-vars
      state = [];
      // TODO: store local
    },
  },
});
export const { addSweep, removeSweep, clearSweeps } = sweepsSlice.actions;
export const sweepsReducer = sweepsSlice.reducer;

export const volPlotSlice = createSlice({
  name: 'volPlots',
  initialState: [] as Plot[],
  reducers: {
    addVolPlot: (state, action: PayloadAction<Plot>) => {
      const plot = action.payload;
      state.push(plot);
      // TODO: store local
    },
    removeVolPlot: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      state.splice(index, 1);
      // TODO: store local
    },
    clearVolPlots: (state) => {
      // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unused-vars
      state = [];
      // TODO: store local
    },
  },
});
export const { addVolPlot, removeVolPlot, clearVolPlots } = volPlotSlice.actions;
export const volPlotReducer = volPlotSlice.reducer;

export const darkThemeSlice = createSlice({
  name: 'theme',
  initialState: false,
  reducers: {
    toggleDarkTheme: (state) => {
      // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unused-vars
      state = !state;
    },
  },
});
export const { toggleDarkTheme } = darkThemeSlice.actions;
export const darkThemeReducer = darkThemeSlice.reducer;
