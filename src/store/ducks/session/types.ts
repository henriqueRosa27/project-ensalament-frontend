/**
 * Action types
 */
export enum SessionTypes {
  LOGIN_REQUEST = '@session/LOGIN_REQUEST',
  LOGIN_SUCCCES = '@session/LOGIN_SUCCCES',
  LOGIN_FAILURE = '@session/LOGIN_FAILURE',
  LOGOUT_REQUEST = '@session/LOGOUT_REQUEST',
  LOGOUT_SUCCCES = '@session/LOGOUT_SUCCCES',
}

/**
 * Data types
 */
export interface Session {
  name: string;
  surname: string;
  email: string;
  role: string;
}

export interface SessionLogin {
  email: string;
  password: string;
}

/**
 * State type
 */
export interface SessionState {
  readonly name: string;
  readonly surname: string;
  readonly email: string;
  readonly role: string;
  readonly errors: [];
  readonly error: string;
  readonly isAutenticate: boolean;
  readonly loading: boolean;
}
