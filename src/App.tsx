import React from 'react';

import Routes from './routes';
import SnackbarProvider from './hooks/Notification/context';
import NotificationProvider from './hooks/Notification';
import AuthProvider from './hooks/AuthContext';
import SignOutProvider from './hooks/Session/SignOutContext';
import GlobalsProvider from './hooks/GlobalsContext';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <NotificationProvider>
          <SignOutProvider>
            <GlobalsProvider>
              <Routes />
            </GlobalsProvider>
          </SignOutProvider>
        </NotificationProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default App;
