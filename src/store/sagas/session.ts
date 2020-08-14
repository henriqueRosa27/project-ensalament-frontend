import { put, call, takeLatest } from 'redux-saga/effects';

import login from '../../services/session';
import { loginSuccess, loginFailure } from '../ducks/session/actions';
import { SessionTypes } from '../ducks/session/types';

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
    console.log(err.response);

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

export default function* routerPermission() {
  yield takeLatest(SessionTypes.LOGIN_REQUEST, load);
}
