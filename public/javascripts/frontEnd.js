import '../sass/style.scss';
import axios from 'axios';

document.addEventListener('click', function(e) {
  
  // Adding ingredient to a recipe
  if (e.target.matches('.add-ingredient')) {
    e.preventDefault();
    const input = e.target.parentElement.innerHTML;
    let currentIndex = parseInt(e.target.parentElement.getAttribute('data-index'));
    // console.log(currentIndex + 1);
    let html = document.createElement('div');
    html.classList.add('form-group');
    html.setAttribute('data-index', currentIndex + 1);
    html.innerHTML = input;
    html.querySelector('label').for = `ingredient[${currentIndex + 1}][name]`;
    html.querySelector('input').name = `ingredients[${currentIndex + 1}][measurement]`;
    html.querySelector('select').name = `ingredients[${currentIndex + 1}][unit]`;
    html.querySelector('input[name*="name"]').name = `ingredients[${currentIndex + 1}][name]`;
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