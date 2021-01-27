import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import history from '../../routes/history';
import SessionReducer from './session';
import NavigationReducer from './navigation';

export default combineReducers({
  router: connectRouter(history),
  session: SessionReducer,
  navigation: NavigationReducer,
});
