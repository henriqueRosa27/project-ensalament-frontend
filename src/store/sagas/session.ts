import { put, call, takeLatest } from 'redux-saga/effects';

import login from '../../services/session';
import { loginSuccess, loginFailure } from '../ducks/session/actions';
import { SessionTypes } from '../ducks/session/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* load(data: any) {
  try {
    const loginInfo = data.payload.data;
    const response = yield call(login, {
      email: loginInfo.email,
      password: loginInfo.password,
    });
    yield put(
      loginSuccess({
        name: 'teste',
        surname: 'teste',
        email: 'teste',
        role: 'teste',
      })
    );
  } catch (err) {
    if (err.response.status === 400) {
      let error: string | [];
      if (err.response.data.message) {
        error = err.response.data.message;
      } else {
        error = err.response.data.error;
      }
      yield put(loginFailure(error));
    }
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* routerPermission() {
  yield takeLatest(SessionTypes.LOGIN_REQUEST, load);
}
