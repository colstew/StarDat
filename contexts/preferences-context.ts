import React from 'react';

interface PrefContext {
  toggleTheme: () => void,
  isThemeDark: boolean,
}
const PreferencesContext = React.createContext<PrefContext>({
  toggleTheme: () => undefined,
  isThemeDark: false,
});

export default PreferencesContext;
