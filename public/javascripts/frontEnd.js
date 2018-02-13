import '../sass/style.scss';
import axios from 'axios';

// const ingredient = document.querySelector('.add-ingredient');
// const removeIngredient = document.querySelectorAll('.remove-ingredient');

// if (ingredient) {
//   ingredient.addEventListener('click', function(e) {
//     e.preventDefault();
//     const html = `
//       <label>Ingredient</label>
//       <input type="text" name="ingredients">
//       <button class="add-ingredient">+</button>
//     `;
//     ingredient.parentElement.innerHTML += html;
//   });
// }

// removeIngredient.forEach((element) => {
//   element.addEventListener('click', function(e) {
//     e.preventDefault();
//     this.parentElement.remove()
//   });
// });


if (document.querySelector('#form--recipe-edit')) {
  new Vue({
    el: '#form--recipe-edit',
    data: {
      title: ''
    },
    computed: {
      getTitle: function() {
        return `cool man || ${title}`
      }
    }
  });
}

if (document.querySelector('#form--recipe-add')) {
  new Vue({
    el: '#form--recipe-add',
    data: {
      title: 'Add your recipe title',
      ingredients: ['Add your ingredients']
    },
    computed: {
      allIngredients() {
        return ingredients
      }
    }
  });
}