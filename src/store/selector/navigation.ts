import { IApplicationState } from '..';

const drawerState = (state: IApplicationState): boolean =>
  state.navigation.drawer;

const backdropState = (state: IApplicationState): boolean =>
  state.navigation.backdrop;

export { drawerState, backdropState };
