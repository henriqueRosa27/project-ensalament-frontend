import { Reducer } from 'redux';
import { NavigationState, NavigationTypes } from './types';

const INITIAL_STATE: NavigationState = {
  drawer: true,
  backdrop: false,
};

const reducer: Reducer<NavigationState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NavigationTypes.TOOGLE_DRAWER:
      return { ...state, drawer: !state.drawer };
    case NavigationTypes.CLOSE_DRAWER:
      return {
        ...state,
        drawer: false,
      };
    case NavigationTypes.OPEN_DRAWER:
      return {
        ...state,
        drawer: true,
      };

    case NavigationTypes.TOOGLE_BACKDROP:
      return { ...state, drawer: !state.backdrop };
    case NavigationTypes.CLOSE_BACKDROP:
      return {
        ...state,
        backdrop: false,
      };
    case NavigationTypes.OPEN_BACKDROP:
      return {
        ...state,
        backdrop: true,
      };
    default:
      return state;
  }
};

export default reducer;
