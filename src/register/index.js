import "bootstrap";
import '../scss/main.scss';
import $ from 'jquery';

const data = $( "form" ).submit(function( event ) {
    const formData = $( this ).serializeArray();
    event.preventDefault();
    console.log(formData);
    return data;
  });