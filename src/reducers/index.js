/* eslint-disable */
import { LIST_ITEMS, CURRENT_RECIPE, EDIT_OR_ADD, MODIFY, REC_ARR } from '../constants/action-types';

let recipeArray = [
{Name: "Asparagus & Potato Pizza", Ingredients: "cornmeal*1 lb. pizza dough*2 medium Yukon gold or other waxy potatoes (about 8 oz)*12 oz. Asparagus*1/2 Red Onion*2 tbsp. olive oil*Kosher salt and pepper*2 oz. thinly sliced provolone cheese (about 6 slices)",
Directions: "Heat oven to 425°F. Dust a baking sheet with cornmeal. Shape the dough into a 16-in.-long oval or rectangle and place on the prepared baking sheet.*In a large bowl, toss the potatoes, asparagus, onion, oil, 1/2 tsp salt and 1/4 tsp pepper. Scatter the vegetables and cheese over the dough and bake until the potatoes are tender and the crust is golden brown and crisp, 20 to 25 minutes."},
{Name: "Cider-Glazed Brussels Sprouts", Ingredients: "1 1/2 c. apple cider*1/2 c. Dried Cranberries*kosher salt*2 lb. small Brussels sprouts, trimmed (halved in large)*2 tbsp. extra-virgin olive oil",
Directions: "Bring the cider to a boil in a small saucepan, then reduce heat and simmer for 15 minutes. Add the cranberries and continue simmering until the liquid reduces to 1⁄4 cup; remove from heat.*Meanwhile, bring 1⁄2 cup water to a simmer in a large skillet. Add 1⁄2 teaspoon salt and the Brussels sprouts and cook, covered, shaking the pan often, until just barely tender, 4 to 5 minutes.*Uncover and turn heat to high, then add the oil and cook, tossing occasionally, until beginning to turn golden brown, 2 to 3 minutes; remove from heat.*Spoon the reduced cider and cranberry mixture on top and gently toss to combine."},
{Name: "Spaghetti Squash", Ingredients:"1 small spaghetti squash*1/4 c. Kalamata olives*3 tbsp. Grated Pecorino Romano cheese*2 tbsp. Chopped parsley*1 tbsp. olive oil*2 tsp. red wine vinegar",
Directions:"Pierce spaghetti squash all over. On plate, microwave squash on High 14 minutes or until tender. Let cool.*Cut squash in half lengthwise; discard seeds. With fork, scrape squash lengthwise; place strands in medium bowl.*Mix in olives, Pecorino Romano, parsley, olive oil, and red wine vinegar."}
];
window.localStorage.clear();
const setRecipeArray = (function() {
  if (JSON.parse(window.localStorage.getItem("recipeArr")) === null) {
    return;
  } else {
    recipeArray = JSON.parse(window.localStorage.getItem("recipeArr"));
  }
})();

const initialState = {
  listItems: recipeArray.length > 0 ? recipeArray.map(item => item.Name) : [],
  currentRecipe: recipeArray.length > 0 ? recipeArray[0].Name : '',
  editOrAdd: 'add',
  modify: false,
  stateRecArr: recipeArray.slice(0),
};

function rootReducer(state = initialState, action) {
  if (action.type === LIST_ITEMS) {
    return Object.assign({}, state, {
      listItems: action.items,
    });
  }
  if (action.type === CURRENT_RECIPE) {
    return Object.assign({}, state, {
      currentRecipe: action.item,
    });
  }
  if (action.type === EDIT_OR_ADD) {
    return Object.assign({}, state, {
      editOrAdd: action.item,
    });
  }
  if (action.type === MODIFY) {
    return Object.assign({}, state, {
      modify: action.item,
    });
  }
  if (action.type === REC_ARR) {
    return Object.assign({}, state, {
      stateRecArr: action.item,
    });
  }
  return state;
}

export default rootReducer;