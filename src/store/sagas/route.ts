import { takeLatest } from 'redux-saga/effects';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* sagaNavigation(data: any) {
  try {
    // eslint-disable-next-line no-console
    yield console.log(data);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.response);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function* routerPermission(): Generator<any, void, unknown> {
  yield takeLatest('@@router/LOCATION_CHANGE', sagaNavigation);
}
