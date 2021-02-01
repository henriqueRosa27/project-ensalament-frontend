import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store';
import Routes from './routes';
import SnackbarProvider from './hooks/Notification/context';
import NOtificationProvider from './hooks/Notification';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SnackbarProvider>
          <NOtificationProvider>
            <Routes />
          </NOtificationProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
