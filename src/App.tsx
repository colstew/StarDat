import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import NavBar from './components/nav-bar';
import { useAppSelector } from './redux/hooks';
import DefaultTheme from './themes/default-theme';
import DarkTheme from './themes/dark-theme';

const App = (): React.ReactElement => {
  const theme = useAppSelector((state) => state.settings.darkMode) ? DarkTheme : DefaultTheme;
  // request location permission
  useEffect(() => {
    (async () => {
      try {
        const enabled = await Location.hasServicesEnabledAsync();
        const { granted } = await Location.getForegroundPermissionsAsync();
        if (!granted && enabled) {
          const { granted: given } = await Location.requestForegroundPermissionsAsync();
          if (!given) {
            throw new Error('App: Location Permission Required, not given'); // TODO: notify before termination
          }
        }
      } catch {
        throw new Error('App: Location Permission Required'); // TODO: notify before termination
        // TODO: handle error
      }
    })();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <NavBar />
      </NavigationContainer>
    </PaperProvider>
  );
};

/*
<Snackbar
          visible
          onDismiss={() => undefined}
        >
          Hello!
        </Snackbar>
*/

export default App;
