import axios from 'axios';

import "bootstrap";
import '../scss/main.scss';


// Dom caching
const email = document.querySelector('input[name="email"]');
const password = document.querySelector('input[name="password"]');
const signIn = document.querySelector('#sign--in');
const alert = document.getElementById('alert');


signIn.addEventListener('click', e => {  
  e.preventDefault();

  const data = getUserData();
  
  postToServer(data);
})


function getUserData() {
   /*
    // Just for testing purposes
    return {
        email: "hbrehman111@gmail.com",
        password: "hbrehman007",
    }
    // Actual logic
    */
    return {
      email: email.value,
      password: password.value,
    }
     
    
  }


      

  async function postToServer(userData) {
    try {
      // send a post request to api
      let response = await axios.post('http://localhost:8000/v1/api/auth', userData);
      console.log(response.headers['x-auth-token']);

      localStorage.setItem('x-auth-toke', response.headers['x-auth-token']);
    } catch(ex) {
      // log the exception on console
      console.log(ex);
      // if there is any error in input send it to UI
      if (ex.response) showError(ex.response.data.message);

    }

  }





  const showError = (message) => {
    alert.className = 'alert alert-danger text-center';
    alert.innerHTML = message;
    const alertInterval = setInterval(() => {
        alert.className = '';
        alert.innerHTML = '';
        console.log('hello wrold');
        clearInterval(alertInterval);
    }, 10000)
    }


  
      //   console.log(response.data);
      //   console.log(response.status);
      //   console.log(response.statusText);
      //   console.log(response.headers);
      //   console.log(response.config);
      // 