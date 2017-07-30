import fetch from 'isomorphic-fetch';
import { config } from "./config";



const API_ROOT = 'http://localhost:8000/api';
const TOKEN = config.AUTH_TOKEN;

class DropsClient {
  checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
          return response;
      } else {
          const error = new Error(`HTTP Error ${response.statusText}`);
          error.status = response.statusText;
          error.response = response;
          console.log(error);
          throw error;
      }
  }

  parseJson(response) {
      return response.json();
  }

  getDrops(){
    return fetch(API_ROOT+'/drops')
    .then(this.checkStatus)
    .then(this.parseJson)
    .then((json) => {return json});
  }

  postDrop(data){
    return fetch(API_ROOT+'/drops', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+TOKEN,
        accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(this.checkStatus)
    .then(this.parseJson)
    .then((json) => {return json});
  }

  putDrop(data, id){
    return fetch(API_ROOT+'/drops/'+id, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+TOKEN,
        accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(this.checkStatus)
    .then(this.parseJson)
    .then((json) => {return json});
  }

  deleteDrop(id){
    return fetch(API_ROOT+'/drops/'+id, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token "+TOKEN,
        accept: 'application/json'
      }
    })
    .then(this.checkStatus)
    .then(this.parseJson)
    .then((json) => {return json});
  }
}


export const dropsClient = new DropsClient();
