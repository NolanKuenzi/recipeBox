/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddEditRecipes from '../containers/add_EditRecipes';

const mapStateToProps = state => {
  const getIngredients = state.stateRecipeArray
    .slice(0)
    .filter(item => item.Name === state.currentRecipe);
  const getDirections = state.stateRecipeArray
    .slice(0)
    .filter(item => item.Name === state.currentRecipe);

  return {
    Ingredients: getIngredients.length === 0 ? null : getIngredients[0].Ingredients,
    Directions: getDirections.length === 0 ? null : getDirections[0].Directions,
    Modify: state.modify,
  };
};

const RecSec = ({ Ingredients, Directions, Modify }) => {
  return (
    <div id="recipeSection">
      <div>
        <h3>Ingredients:</h3>
        <ul data-testid='ingredientsSec'>
          {Ingredients === null
            ? null
            : Ingredients.split('*').map(item => (
              <li key={item} className="ingredientsItem" data-testid="recSecIngredients">
                {item}
              </li>
            ))}
        </ul>
      </div>
      <div>
        <h3>Directions:</h3>
        <ol data-testid='directionsSec'>
          {Directions === null
            ? null
            : Directions.split('*').map(item => (
              <li key={item} className="ingredientsItem" data-testid="recSecDirections">
                {item}
              </li>
            ))}
        </ol>
      </div>
      <div data-testid="recSecModify">{Modify === true ? <AddEditRecipes /> : null}</div>
    </div>
  );
};

RecSec.propTypes = {
  Ingredients: PropTypes.string,
  Directions: PropTypes.string,
  Modify: PropTypes.bool,
};

const RecipeSection = connect(mapStateToProps)(RecSec);

export { RecSec };
export default RecipeSection;
