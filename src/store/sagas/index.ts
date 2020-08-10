import { all, takeLatest } from 'redux-saga/effects';

import { SessionTypes } from '../ducks/session/types';

import load from './session';

export default function* rootSaga() {
  return yield all([takeLatest(SessionTypes.LOGIN_REQUEST, load)]);
}
