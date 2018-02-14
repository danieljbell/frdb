import '../sass/style.scss';
import axios from 'axios';

document.addEventListener('click', function(e) {
  
  // Adding ingredient to a recipe
  if (e.target.matches('.add-ingredient')) {
    e.preventDefault();
    const input = e.target.parentElement.innerHTML;
    let html = document.createElement('div');
    html.classList.add('form-group');
    html.innerHTML = input;
    html.querySelector('input').value = null;
    const ingredientsList = document.querySelector('.ingredients-list');
    ingredientsList.appendChild(html);
  }

  // Remove ingredient from recipe
  if (e.target.matches('.remove-ingredient')) {
    e.preventDefault();
    e.target.parentElement.remove();
  }

}, false);

document.addEventListener('submit', function(e) {
  
  // if (e.target.matches('.form--recipe')) {
  //   e.preventDefault();
  //   console.log('trying to update dat recipe?!');
  //   setTimeout(function() {
  //     e.target.submit();
  //   }, 3000);
  // }

});