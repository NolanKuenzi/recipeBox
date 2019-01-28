/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LIST_ITEMS, CURRENT_RECIPE, MODIFY, REC_ARR } from '../constants/action-types';

const mapStateToProps = state => {
  const getIngredients = state.stateRecArr
    .slice(0)
    .filter(item => item.Name === state.currentRecipe);
  const getDirections = state.stateRecArr
    .slice(0)
    .filter(item => item.Name === state.currentRecipe);
  return {
    listItems: state.listItems,
    currentRecipe: state.currentRecipe,
    editOrAdd: state.editOrAdd,
    ingredients: getIngredients.length === 0 ? null : getIngredients[0].Ingredients,
    directions: getDirections.length === 0 ? null : getDirections[0].Directions,
    modify: state.modify,
    stateRecArr: state.stateRecArr,
  };
};

class AddOrEditRecipes extends React.Component {
  componentWillUnmount() {
    const recipeInput = document.getElementById('recipeDivInput');
    const ingredientsInput = document.getElementById('ingredientsInput');
    const directionsInput = document.getElementById('directionsInput');
    recipeInput.value = '';
    ingredientsInput.value = '';
    directionsInput.value = '';
    this.addButton();
  }

  finish = () => {
    const recipeInput = document.getElementById('recipeDivInput');
    const ingredientsInput = document.getElementById('ingredientsInput');
    const directionsInput = document.getElementById('directionsInput');
    if (recipeInput.value === '' || ingredientsInput.value === '' || directionsInput.value === '') {
      alert('Please Complete Recipe Form');
      return;
    }
    const { ...destructProps } = this.props;
    const update = (listItems, currentRec, RecArr) => {
      destructProps.dispatch({ type: LIST_ITEMS, items: listItems });
      destructProps.dispatch({ type: CURRENT_RECIPE, item: currentRec });
      destructProps.dispatch({ type: REC_ARR, item: RecArr });
      this.cancel();
    };

    if (destructProps.editOrAdd === 'add') {
      if (destructProps.listItems.length === 8) {
        alert('Maximum amount of recipes has been reached.');
        return;
      }
      if (destructProps.listItems.some(item => item === recipeInput.value) === true) {
        alert('Cannot have duplicate names of recipes');
        return;
      }
      const newListItems = destructProps.listItems.slice(0);
      newListItems.push(recipeInput.value);
      const newCurrentRecipe = newListItems[newListItems.length-1];
      const newRecipeArray = destructProps.stateRecArr.slice(0);
      newRecipeArray.push({
        Name: recipeInput.value,
        Ingredients: ingredientsInput.value,
        Directions: directionsInput.value,
      });
      update(newListItems.slice(0), newCurrentRecipe, newRecipeArray.slice(0));
      window.localStorage.setItem('recipeArr', JSON.stringify(newRecipeArray.slice(0)));
    }
    if (destructProps.editOrAdd === 'edit') {
      const duplicateRecName = destructProps.listItems
        .slice(0)
        .filter(item => item !== destructProps.currentRecipe);
      if (duplicateRecName.some(item => item === recipeInput.value) === true) {
        alert('Cannot have duplicate names of recipes');
        return;
      }
      const newListItems = destructProps.listItems.slice(0);
      newListItems[newListItems.indexOf(destructProps.currentRecipe)] = recipeInput.value;
      const newCurrentRecipe = newListItems[newListItems.indexOf(recipeInput.value)];
      const newRecipeArray = destructProps.stateRecArr.slice(0);
      for (let i = 0; i < newRecipeArray.length; i++) {
        if (newRecipeArray[i].Name === destructProps.currentRecipe) {
          newRecipeArray[i].Name = recipeInput.value;
          newRecipeArray[i].Ingredients = ingredientsInput.value;
          newRecipeArray[i].Directions = directionsInput.value;
          update(newListItems.slice(0), newCurrentRecipe, newRecipeArray.slice(0));
          window.localStorage.setItem('recipeArr', JSON.stringify(newRecipeArray.slice(0)));
          return;
        }
      }
    }
  };

  cancel = () => {
    const { ...destructProps } = this.props;
    destructProps.dispatch({ type: MODIFY, item: false });
  };

  addButton = () => {
    const disableAddButton = document.getElementById('add');
    disableAddButton.disabled = false;
  };

  render() {
    const { ...destructProps } = this.props;
    return (
      <div id="recipeDiv">
        <div>
          <h3>{destructProps.editOrAdd === 'add' ? 'Add a Recipe' : 'Edit Recipe'}</h3>
        </div>
        <div id="inputs">
          <p>Recipe:</p>
          <input
            type="text"
            className="recipeDivClass"
            id="recipeDivInput"
            defaultValue={destructProps.editOrAdd === 'add' ? null : destructProps.currentRecipe}
            placeholder="Recipe Name"
          />
          <p>Ingredients:</p>
          <textarea
            type="text"
            className="recipeDivClass"
            id="ingredientsInput"
            defaultValue={destructProps.editOrAdd === 'add' ? null : destructProps.ingredients}
            placeholder="Seperate each ingredient with a *"
          />
          <p>Directions:</p>
          <textarea
            type="text"
            className="recipeDivClass"
            id="directionsInput"
            defaultValue={destructProps.editOrAdd === 'add' ? null : destructProps.directions}
            placeholder="Seperate each direction with a *"
          />
          <br />
          <button type="button" onClick={this.finish}>
            Finish
          </button>
          <button type="button" onClick={this.cancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

AddOrEditRecipes.propTypes = {
  editOrAdd: PropTypes.string,
  currentRecipe: PropTypes.string,
  ingredients: PropTypes.string,
  directions: PropTypes.string,
  stateRecArr: PropTypes.array,
};

const AddEditRecipes = connect(mapStateToProps)(AddOrEditRecipes);

export default AddEditRecipes;