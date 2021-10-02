import { DefaultTheme as DefaultPaperTheme } from 'react-native-paper';
import { DefaultTheme as DefaultNavTheme } from '@react-navigation/native';

// try using os apperance via Apperance API

const DefaultTheme = {
  ...DefaultPaperTheme,
  ...DefaultNavTheme,
  colors: {
    ...DefaultPaperTheme.colors,
    ...DefaultNavTheme.colors,
  },
};

/*
const DefaultTheme = {
  dark: false,
  roundness: 4,
  colors: {
    primary: 'rgb(0, 122, 255)',
    accent: '#03dac4',
    background: 'rgb(242, 242, 242)',
    surface: '#ffffff',
    error: '#B00020',
    text: 'rgb(28, 28, 30)',
    onSurface: '#000000',
    disabled: 'rgba(0, 0, 0, 0.26)',
    placeholder: 'rgba(0, 0, 0, 0.54)',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: 'rgb(255, 59, 48)',
    card: 'rgb(255, 255, 255)',
    border: 'rgb(216, 216, 216)',
  },
  fonts: {
    regular: {
      fontFamily: 'Roboto',
      fontWeight: '400',
    },
    medium: {
      fontFamily: 'Roboto',
      fontWeight: '500',
    },
    light: {
      fontFamily: 'Roboto',
      fontWeight: '300',
    },
    thin: {
      fontFamily: 'Roboto',
      fontWeight: '100',
    },
  },
  animation: {
    scale: 1,
  },
  mode: 'exact',
};
*/
export default DefaultTheme;
