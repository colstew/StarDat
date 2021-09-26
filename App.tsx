import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import PreferencesContext from './contexts/preferences-context';
import NavBar from './components/nav-bar';
import DefaultTheme from './themes/default-theme';
import DarkTheme from './themes/dark-theme';

export default function App() : React.ReactElement {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const toggleTheme = () => (setIsThemeDark(!isThemeDark));
  const theme = isThemeDark ? DarkTheme : DefaultTheme;
  return (
    <PreferencesContext.Provider value={{ isThemeDark, toggleTheme }}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <NavBar />
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
