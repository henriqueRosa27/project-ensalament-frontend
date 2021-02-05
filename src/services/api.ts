import axios from 'axios';

const api = axios.create({
  baseURL: `https://ensalamento.herokuapp.com/`,
});

const autenticanted = {};

export { api, autenticanted };
