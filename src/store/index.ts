import { createStore, Store, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, RouterState } from 'connected-react-router';
import { persistStore } from 'redux-persist';

import persistReducer from './persistReducer';
import RootReducer from './ducks';
import RootSaga from './sagas';
import history from '../routes/history';
import { SessionState } from './ducks/session/types';
import { NavigationState } from './ducks/navigation/types';

export interface IApplicationState {
  router: RouterState;
  session: SessionState;
  navigation: NavigationState;
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const middlewares = [sagaMiddleware, routerMiddleware(history)];

const store: Store<IApplicationState> = createStore(
  persistReducer(RootReducer),
  composeEnhancer(applyMiddleware(...middlewares))
);

const persistor = persistStore(store);

sagaMiddleware.run(RootSaga);

export { store, persistor };
