import { IApplicationState } from '..';

const drawerState = (state: IApplicationState): boolean =>
  state.navigation.drawer;

export default drawerState;
