import { all } from 'redux-saga/effects';

import sessionSagas from './session';
import routeSagas from './route';

export default function* rootSaga(): any {
  return yield all([sessionSagas(), routeSagas()]);
}
