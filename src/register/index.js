import axios from 'axios';

import "bootstrap";
import '../scss/main.scss';


// Dom caching
const name = document.querySelector('input[name="name"]');
const phone = document.querySelector('input[name="phone"]');
const email = document.querySelector('input[name="email"]');
const password = document.querySelector('input[name="password"]');
const gender = document.querySelector('input[name="gender"]');
const country = document.querySelector('input[name="country"]');
const dob = document.querySelector('input[name="dob"]');
const religion = document.querySelector('select[name="religion"]');
const signUp = document.querySelector('#sign--up');


signUp.addEventListener('click', e => {  
  e.preventDefault();

  const data = getUserData();
  
  postToServer(data);
})


function getUserData() {
   // Just for testing purposes
    return {
      name: 'hbrehman',
      phone:'923000687231',
      email: 'hbrehman98@gmail.com',
      password: 'hbrehman007',
      gender: 'Male',
      country: 'Pakistan',
      religion: 'Islam',
      dob: 29-10-1998
    }
    // Actual logic
    /*
    return {
      name: name.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
      gender: gender.value,
      country: country.value,
      religion: religion.value,
      dob: dob.value
    }
     */
    
  }


      

  async function postToServer(userData) {
    try {
      // send a post request to api
      let response = await axios.post('http://localhost:8000/v1/api/users', userData);
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
    if (/dob/.test(message)) {
      message = "Please Enter a valid Date of Birth...";
    }
    document.getElementById('alert').className = 'alert alert-danger text-center';
    document.getElementById('alert').innerHTML = message;
    }


  
      //   console.log(response.data);
      //   console.log(response.status);
      //   console.log(response.statusText);
      //   console.log(response.headers);
      //   console.log(response.config);
      // 