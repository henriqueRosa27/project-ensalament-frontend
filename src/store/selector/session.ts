import { IApplicationState } from '..';
import { SessionState } from '../ducks/session/types';

const sessionData = (state: IApplicationState): SessionState => state.session;

export default sessionData;
