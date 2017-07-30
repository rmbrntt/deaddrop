import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { config } from "./config";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8000/api';
const responseBody = res => res.body;

//temporarily using known token until auth can be implemented
let token = config.AUTH_TOKEN;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`)
  }
}

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody)
};

const omitId = drop => Object.assign({}, drop, { id: undefined })
const Drops = {
  all: () =>
    requests.get(`/drops`),
  get: id =>
    requests.get(`/drops/${id}`),
  create: drop =>
    requests.post(`/drops`, { drop }),
  update: drop =>
    requests.put(`/drops/${drop.id}`, { drop: omitId(drop)}),
  del: dropId =>
    requests.del(`/drops/${dropId}`)
}

export default {
  Drops
};
