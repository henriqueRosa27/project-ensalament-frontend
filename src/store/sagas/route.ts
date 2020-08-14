import { takeLatest } from 'redux-saga/effects';

function* sagaNavigation(data: any) {
  try {
    yield console.log(data);
  } catch (err) {
    console.log(err.response);
  }
}

export default function* routerPermission() {
  yield takeLatest('@@router/LOCATION_CHANGE', sagaNavigation);
}
