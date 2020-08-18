import { takeLatest, select, put } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';

import history from '../../routes/history';
import { getToken } from '../../services/localStorage';
import sessionData from '../selector/session';
import { loginSuccess } from '../ducks/session/actions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* sagaNavigation(data: any) {
  try {
    const token = getToken();
    console.log(!token);
    console.log(data.payload.location.pathname);
    if (!token && data.payload.location.pathname !== '/login') {
      yield history.push('/login');
    }

    if (token && data.payload.location.pathname === '/login') {
      yield history.push('/');
    }

    const state = yield select(sessionData);

    if (!state.isAutenticated && token) {
      const dataJwt = jwtDecode(token);
      const { user }: any = dataJwt;

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
