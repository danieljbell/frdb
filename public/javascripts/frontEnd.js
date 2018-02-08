import '../sass/style.scss';
import axios from 'axios';

const ingredient = document.querySelector('.add-ingredient');
const removeIngredient = document.querySelectorAll('.remove-ingredient');

if (ingredient) {
  ingredient.addEventListener('click', function(e) {
    e.preventDefault();
    const html = `
      <label>Ingredient</label>
      <input type="text" name="ingredients">
      <button class="add-ingredient">+</button>
    `;
    ingredient.parentElement.innerHTML += html;
  });
}

removeIngredient.forEach((element) => {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    this.parentElement.remove()
  });
});