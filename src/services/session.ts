import axios from './api';
import { SessionLogin } from '../store/ducks/session/types';

export default function login(data: SessionLogin) {
  return axios.post('auth/login', { ...data });
}
