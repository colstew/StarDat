import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import NavBar from './components/nav-bar';
import { useAppSelector } from './redux/hooks';
import DefaultTheme from './themes/default-theme';
import DarkTheme from './themes/dark-theme';

const App = (): React.ReactElement => {
  const theme = useAppSelector((state) => state.darkTheme) ? DarkTheme : DefaultTheme;
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
  /*
  useEffect(() => {
    State.localSweepsRetrieve();
    State.localVolPlotRetrieve();
  }, []);
  */

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <NavBar />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
