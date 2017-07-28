import fetch from 'isomorphic-fetch';




const apiHost = 'http://localhost:8000/api';

class DropsClient {


  getDrops(){
    return fetch(apiHost+'/drops')
    .then(response => response.json())
    .then((json) => {return json});
  }
}




export const dropsClient = new DropsClient();
