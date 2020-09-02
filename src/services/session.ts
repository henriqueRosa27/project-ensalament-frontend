/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { login as axiosLogin } from './api';
import { SessionLogin } from '../store/ducks/session/types';

export default function login(data: SessionLogin) {
  return axiosLogin.post('auth/login', { ...data });
}
