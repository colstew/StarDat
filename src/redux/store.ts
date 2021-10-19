import { configureStore } from '@reduxjs/toolkit';
import { sweepsReducer, darkThemeReducer, volPlotReducer } from './reducers';

const store = configureStore({
  reducer: {
    darkTheme: darkThemeReducer,
    sweeps: sweepsReducer,
    volplots: volPlotReducer,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
