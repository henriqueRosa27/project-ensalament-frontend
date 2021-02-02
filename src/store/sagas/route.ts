import { takeLatest, select, put } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';

import { api } from '../../services/api';
import history from '../../routes/history';
import { getToken } from '../../services/localStorage';
import sessionData from '../selector/session';
import { loginSuccess } from '../ducks/session/actions';
import { SessionState } from '../ducks/session/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* sagaNavigation(data: any) {
  try {
    const token = getToken();

    if (!token && data.payload.location.pathname !== '/login') {
      delete api.defaults.headers.Authorization;
      yield history.push('/login');
    }

    if (token && data.payload.location.pathname === '/login') {
      yield history.push('/');
    }

    const state: SessionState = yield select(sessionData);

    if (!state.isAutenticate && token) {
      const dataJwt = jwtDecode(token);
      const { user }: any = dataJwt;

      delete api.defaults.headers.Authorization;
      api.defaults.headers.Authorization = `Bearer ${token}`;

      yield put(
        loginSuccess({
          name: user.name,
          surname: user.surname,
          email: user.email,
          role: user.role,
        })
      );
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(err.response);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function* routerPermission(): Generator<any, void, unknown> {
  yield takeLatest('@@router/LOCATION_CHANGE', sagaNavigation);
}
