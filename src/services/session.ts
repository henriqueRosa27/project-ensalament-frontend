/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { api as axiosLogin } from './api';

interface SessionLogin {
  email: string;
  password: string;
}

export default async function login(
  data: SessionLogin
): Promise<{ token: string }> {
  const response = await axiosLogin.post('auth/login', { ...data });
  return response.data;
}
