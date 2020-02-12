import axios from 'axios';
import "bootstrap";
import '../scss/main.scss';
const path = require('path');


// Dom caching
const email = document.querySelector('input[name="email"]');
const password = document.querySelector('input[name="password"]');
const signIn = document.querySelector('#sign--in');
const alert = document.getElementById('alert');


signIn.addEventListener('click', e => {  
  e.preventDefault();

  const data = getUserData();
  const isPosted = postToServer(data);
  if (isPosted) {
    window.location = 'profile.html';
  }



})


function getUserData() {
 
    // Just for testing purposes
    return {
        email: "hbrehman111@gmail.com",
        password: "hbrehman007",
    }

     /*
    // Actual logic
    return {
      email: email.value,
      password: password.value,
    }
         */
    
  }


      

  async function postToServer(userData) {
    try {
      // send a post request to api
      let response = await axios.post('http://localhost:8000/v1/api/auth', userData);
      localStorage.setItem('x-auth-toke', response.headers['x-auth-token']);
      return true;
    } catch(ex) {
      // log the exception on console
      console.log(ex, 'exception thrown');
      // if there is any error in input send it to UI
      if (ex.response) showError(ex.response.data.message);
      return false;
    }

  }





  const showError = (message) => {
    alert.className = 'alert alert-danger text-center';
    alert.innerHTML = message;
    const alertInterval = setInterval(() => {
        alert.className = '';
        alert.innerHTML = '';
        clearInterval(alertInterval);
    }, 10000)
    }


  
      //   console.log(response.data);
      //   console.log(response.status);
      //   console.log(response.statusText);
      //   console.log(response.headers);
      //   console.log(response.config);
      // 