import { Reducer } from 'redux';
import { SessionState, SessionTypes } from './types';

const INITIAL_STATE: SessionState = {
  name: '',
  surname: '',
  email: '',
  role: '',
  errors: [],
  error: '',
  isAutenticate: false,
  loading: false,
};

const reducer: Reducer<SessionState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SessionTypes.LOGIN_REQUEST:
      return {
        ...state,
        errors: INITIAL_STATE.errors,
        error: INITIAL_STATE.error,
        isAutenticate: true,
        ...action.payload.data,
        loading: true,
      };
    case SessionTypes.LOGIN_SUCCCES:
      return {
        ...state,
        errors: INITIAL_STATE.errors,
        error: INITIAL_STATE.error,
        isAutenticate: true,
        loading: false,
        ...action.payload.data,
      };
    case SessionTypes.LOGIN_FAILURE: {
      const errorRequest =
        typeof action.payload.data !== 'string'
          ? { errors: action.payload.data }
          : { error: action.payload.data };
      return {
        ...state,
        ...INITIAL_STATE,
        ...errorRequest,
        loading: false,
      };
    }
    case SessionTypes.LOGOUT_SUCCCES:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default reducer;
