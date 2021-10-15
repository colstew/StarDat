import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import StateContext, { Sweep, Plot } from './contexts/state-context';
import NavBar from './components/nav-bar';
import DefaultTheme from './themes/default-theme';
import DarkTheme from './themes/dark-theme';

const storeLocal = async (key: string, value: Sweep[] | Plot[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // TODO: log error
    // saving error
  }
};

const localSweepsRetrieve = async (set: (val: Sweep[])=> void) => {
  try {
    const jsonValue = await AsyncStorage.getItem('@sweeps');
    set(jsonValue != null ? JSON.parse(jsonValue) : []);
  } catch (e) {
    // TODO: log error
    // read error
  }
};

const localVolPlotRetrieve = async (set: (val: Plot[])=> void) => {
  try {
    const jsonValue = await AsyncStorage.getItem('@volplots');
    set(jsonValue != null ? JSON.parse(jsonValue) : []);
  } catch (e) {
    // TODO: log error
    // read error
  }
};

export default function App() : React.ReactElement {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const toggleTheme = () => (setIsThemeDark(!isThemeDark));
  const theme = isThemeDark ? DarkTheme : DefaultTheme;

  const [sweeps, setSweeps] = React.useState<Sweep[]>([]);
  const addSweep = (sweep: Sweep) => {
    sweeps.push(sweep);
    setSweeps([...sweeps]);
    storeLocal('@sweeps', sweeps);
  };
  const removeSweep = (index: number) => {
    sweeps.splice(index, 1);
    setSweeps([...sweeps]);
    storeLocal('@sweeps', sweeps);
  };

  const [volplots, setVolPlots] = React.useState<Plot[]>([]);
  const addPlot = (plot: Plot) => {
    volplots.push(plot);
    setVolPlots([...volplots]);
    storeLocal('@volplots', volplots);
  };
  const removePlot = (index: number) => {
    volplots.splice(index, 1);
    setVolPlots([...volplots]);
    storeLocal('@volplots', volplots);
  };

  // request location permission
  useEffect(() => {
    (async () => {
      try {
        const { granted } = await Location.getForegroundPermissionsAsync();
        if (!granted) {
          const { granted: given } = await Location.requestForegroundPermissionsAsync();
          if (!given) {
            throw new Error('Location Permisson Required'); // TODO: notify before termination
          }
        }
      } catch {
        // TODO: handle error
      }
    })();
  }, []);

  // load local sweeps and volplots
  useEffect(() => {
    localSweepsRetrieve(setSweeps);
    localVolPlotRetrieve(setVolPlots);
  }, []);

  return (
    <StateContext.Provider value={{
      isThemeDark,
      toggleTheme,
      sweeps,
      addSweep,
      removeSweep,
      volplots,
      addPlot,
      removePlot,
    }}
    >
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <NavBar />
        </NavigationContainer>
      </PaperProvider>
    </StateContext.Provider>
  );
}
