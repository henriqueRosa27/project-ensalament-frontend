import axios from 'axios';

//const URL = 'http://localhost:3333/';
const URL = 'https://ensalamento.herokuapp.com/';

const api = axios.create({
  baseURL: URL,
});

const autenticanted = {};

export { api, autenticanted };
