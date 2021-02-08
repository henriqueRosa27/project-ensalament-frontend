import axios from 'axios';

// const LOCAL_URL = 'http://localhost:3333/';
const REMOTE_URL = 'https://ensalamento.herokuapp.com/';

const api = axios.create({
  baseURL: REMOTE_URL,
});

const autenticanted = {};

export { api, autenticanted };
