import DefaultTheme from './default-theme';

const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    primary: 'rgb(10, 132, 255)',
    accent: '#03dac6',
    background: 'rgb(1, 1, 1)',
    surface: '#121212',
    error: '#CF6679',
    text: 'rgb(229, 229, 231)',
    onSurface: '#FFFFFF',
    disabled: 'rgba(255, 255, 255, 0.38)',
    placeholder: 'rgba(255, 255, 255, 0.54)',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: 'rgb(255, 69, 58)',
    card: 'rgb(18, 18, 18)',
    border: 'rgb(39, 39, 41)',
  },
  mode: 'adaptive',
} as const;

export default DarkTheme;
