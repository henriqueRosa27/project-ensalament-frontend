import { IApplicationState } from '..';

const currentRoute = (state: IApplicationState): string =>
  state.router.location.pathname;

export default currentRoute;
