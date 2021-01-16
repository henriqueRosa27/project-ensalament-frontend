/**
 * Action types
 */
export enum NavigationTypes {
  TOOGLE_DRAWER = '@navigation/TOOGLE_DRAWER',
  CLOSE_DRAWER = '@navigation/CLOSE_DRAWER',
  OPEN_DRAWER = '@navigation/OPEN_DRAWER',

  TOOGLE_BACKDROP = '@navigation/TOOGLE_BACKDROP',
  CLOSE_BACKDROP = '@navigation/CLOSE_BACKDROP',
  OPEN_BACKDROP = '@navigation/OPEN_BACKDROP',
}

/**
 * State type
 */
export interface NavigationState {
  readonly drawer: boolean;
  readonly backdrop: boolean;
}
