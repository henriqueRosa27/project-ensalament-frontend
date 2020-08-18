/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { action } from 'typesafe-actions';
import { SessionTypes, Session, SessionLogin } from './types';

export const loginRequest = (data: SessionLogin) =>
  action(SessionTypes.LOGIN_REQUEST, { data });

export const loginSuccess = (data: Session) =>
  action(SessionTypes.LOGIN_SUCCCES, { data });

export const loginFailure = (data: [] | string) =>
  action(SessionTypes.LOGIN_FAILURE, { data });

export const logoutRequest = () => action(SessionTypes.LOGOUT_REQUEST);

export const logoutSuccess = () => action(SessionTypes.LOGOUT_SUCCCES);
