import { Reducer } from 'redux';
import { NavigationState, NavigationTypes } from './types';

const INITIAL_STATE: NavigationState = {
  drawer: true,
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
    default:
      return state;
  }
};

export default reducer;
