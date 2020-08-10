import React from 'react';
import { Provider } from 'react-redux';

import Login from './pages/Login';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Login />
    </Provider>
  );
}

export default App;
