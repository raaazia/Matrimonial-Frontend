import "bootstrap";
import '../scss/main.scss';
import $ from 'jquery';

$( "form" ).submit(function( event ) {
    const formData = $( this ).serializeArray();
    console.log(formData);
    event.preventDefault();
  });
