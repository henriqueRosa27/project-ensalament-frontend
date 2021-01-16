import { all, AllEffect } from 'redux-saga/effects';

import sessionSagas from './session';
import routeSagas from './route';

export default function* rootSaga(): unknown {
  return yield all([sessionSagas(), routeSagas()]);
}
