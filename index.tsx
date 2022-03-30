import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';
import { PersistGate } from 'redux-persist/integration/react';
import * as Sentry from 'sentry-expo';
import App from './src/App';
import store, { persistor } from './src/redux/store';

Sentry.init({
  dsn: 'https://57b12584f0af431a91a271852c082a34@o1073551.ingest.sentry.io/6073220',
  enableInExpoDevelopment: true,
  debug: true,
  /* If `true`, Sentry will try to print out useful debugging information if
  something goes wrong with sending the event. Set it to `false` in production. */
});

function Root() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
registerRootComponent(Root);
