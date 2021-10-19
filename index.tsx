import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import App from './src/App';
import store from './src/redux/store';

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
registerRootComponent(Root);
