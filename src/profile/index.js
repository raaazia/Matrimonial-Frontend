import axios from 'axios';

// import 'jquery';
 import $ from 'jquery';
import "bootstrap";
import '../scss/main.scss';


// Dom caching Education Basics and lifestyle
const userInfoSubmit = document.querySelector('#EBL_submit_btn');
const FamilyInfoSubmit = document.querySelector('#FD_submit_btn');
const InterestsInfoSubmit = document.querySelector('#interest_submit_btn');

// education basics and lifestyle Details
userInfoSubmit.addEventListener('click', e => {  
  e.preventDefault();
  const data = $('#ebl_form').serializeArray();
//   const data = getUserData();
  console.log(data);
//   postToServer(data);
})

// Users interest Details
InterestsInfoSubmit.addEventListener('click', e => {  
  e.preventDefault();
  const data = $('#interests_info').serializeArray();
//   const data = getUserData();
  console.log(data);
//   postToServer(data);
})


// Family Details
FamilyInfoSubmit.addEventListener('click', e => {  
  e.preventDefault();
  const data = $('#family_info').serializeArray();
//   const data = getUserData();
  console.log(data);
//   postToServer(data);
})



function getUserData() {
   // Just for testing purposes
    // return {
    //   education: 'hbrehman',
    //   profession:'923000687231',
    //   motherTongue: 'hbrehman98@gmail.com',
    //   password: 'hbrehman007',
    //   gender: 'male',
    //   country: 'Pakistan',
    //   religion: 'Islam',
    //   dob: 29-10-1998
    // }
    
    // Actual logic
    
  }


      

  async function postToServer(userData) {
    try {
      // send a post request to api
      let response = await axios.post('http://localhost:8000/v1/api/users/basicInfo', userData);
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


    //   Dom Chaching

    
// const education = document.querySelector('input[name="education"]');
// const profession = document.querySelector('input[name="profession"]');
// const motherTongue  = document.querySelector('input[name="motherTongue"]');
// const caste = document.querySelector('input[name="caste"]');
// const complexion = document.querySelector('input[name="complexion"]');
// const weight = document.querySelector('input[name="weight"]');
// const diet = document.querySelector('input[name="diet"]');
// const height = document.querySelector('input[name="height"]');
// const aboutUser = document.querySelector('textarea[name="aboutUser"]');

// Get data from user

// return {
    //   education: education.value,
    //   profession: profession.value,
    //   motherTongue: motherTongue.value,
    //   caste: caste.value,
    //   complexion: complexion.value,
    //   weight: weight.value,
    //   diet: diet.value,
    //   height: height.value,
    //   aboutUser: aboutUser.value
    // }    