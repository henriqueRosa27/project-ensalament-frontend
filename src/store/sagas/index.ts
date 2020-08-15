import { all } from 'redux-saga/effects';

import sessionSagas from './session';
import routeSagas from './route';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* rootSaga() {
  return yield all([sessionSagas(), routeSagas()]);
}
