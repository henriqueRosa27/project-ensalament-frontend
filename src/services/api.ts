import axios from 'axios';
import { getToken } from './localStorage';

const login = axios.create({
  baseURL: `http://localhost:3333/`,
});

const autenticanted = axios.create({
  baseURL: `http://localhost:3333/`,
  headers: { Authorization: `Bearer ${getToken()}` },
});

export { login, autenticanted };
