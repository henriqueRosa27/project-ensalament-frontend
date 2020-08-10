import { createStore, Store, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import RootReducer from './ducks';
import RootSaga from './sagas';
import { SessionState } from './ducks/session/types';

export interface IApplicationState {
  SessionState: SessionState;
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store: Store<IApplicationState> = createStore(
  RootReducer,
  {},
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(RootSaga);

export default store;
