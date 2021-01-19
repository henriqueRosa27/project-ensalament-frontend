import { put, call, takeLatest } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';

import { api } from '../../services/api';
import login from '../../services/session';
import { setToken, removeToken } from '../../services/localStorage';
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
} from '../ducks/session/actions';
import { SessionTypes } from '../ducks/session/types';
import history from '../../routes/history';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* load(data: any) {
  try {
    const loginInfo = data.payload.data;

    const response: { data: any } = yield call(login, {
      email: loginInfo.email,
      password: loginInfo.password,
    });

    const { token } = response.data;

    setToken(token);

    const dataJwt = jwtDecode(token);
    const { user }: any = dataJwt;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(
      loginSuccess({
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
      })
    );

    history.push('/');
  } catch (err) {
    if (err.response.status === 400) {
      console.log(err.response.data);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* logout(data: any) {
  try {
    delete api.defaults.headers.Authorization;
    yield call(removeToken);
    console.log('chamou remove token');
    yield put(logoutSuccess());
    console.log('chamou logout');
    history.push('/login');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err);
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function* routerPermission() {
  yield takeLatest(SessionTypes.LOGIN_REQUEST, load);
  yield takeLatest(SessionTypes.LOGOUT_REQUEST, logout);
}
