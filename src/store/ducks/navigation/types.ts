/**
 * Action types
 */
export enum NavigationTypes {
  TOOGLE_DRAWER = '@navigation/TOOGLE_DRAWER',
  CLOSE_DRAWER = '@navigation/CLOSE_DRAWER',
  OPEN_DRAWER = '@navigation/OPEN_DRAWER',
}

/**
 * State type
 */
export interface NavigationState {
  readonly drawer: boolean;
}
