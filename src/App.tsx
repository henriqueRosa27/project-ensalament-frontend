import React from 'react';

import Routes from './routes';
import SnackbarProvider from './hooks/Notification/context';
import NotificationProvider from './hooks/Notification';
import AuthProvider from './hooks/AuthContext';
import SignOutProvider from './hooks/Session/SignOutContext';
import GlobalsProvider from './hooks/GlobalsContext';

function App(): JSX.Element {
  return (
    <SnackbarProvider>
      <NotificationProvider>
        <AuthProvider>
          <SignOutProvider>
            <GlobalsProvider>
              <Routes />
            </GlobalsProvider>
          </SignOutProvider>
        </AuthProvider>
      </NotificationProvider>
    </SnackbarProvider>
  );
}

export default App;
