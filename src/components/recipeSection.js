/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddEditRecipes from '../containers/add_EditRecipes';

const mapStateToProps = state => {
  const getIngredients = state.stateRecArr
    .slice(0)
    .filter(item => item.Name === state.currentRecipe);
  const getDirections = state.stateRecArr
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
        <ul>
          {Ingredients === null
            ? null
            : Ingredients.split('*').map(item => (
                <li key={item} className="ingredientsItem">
                  {item}
                </li>))}
        </ul>
      </div>
      <div>
        <h3>Directions:</h3>
        <ol>
          {Directions === null
            ? null
            : Directions.split('*').map(item => (
              <li key={item} className="ingredientsItem">
                {item}
              </li>))}
        </ol>
      </div>
      <div>
        {Modify === true ? <AddEditRecipes /> : null}
      </div>
    </div>
  );
};

RecSec.propTypes = {
  Ingredients: PropTypes.string,
  Directions: PropTypes.string,
  Modify: PropTypes.bool,
};

const RecipeSection = connect(mapStateToProps)(RecSec);

export default RecipeSection;
