/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listItems, currentRecipe, modify, recipeArray, disableBtns } from '../actions/index';

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
  constructor(props) {
    super(props);
    const { ...destructProps } = this.props;
    this.state = {
      localCurrentRec: destructProps.editOrAdd === 'add' ? '' : destructProps.currentRecipe,
      localIngredients: destructProps.editOrAdd === 'add' ? '' : destructProps.ingredients,
      localDirections: destructProps.editOrAdd === 'add' ? '' : destructProps.directions,
    };
  }

  componentDidMount() {
    this.disableBtns(true);
  }

  componentWillUnmount() {
    this.disableBtns(false);
  }

  changeFunc = input => {
    if (input.target.id === 'recipeDivInput') {
      this.setState({
        localCurrentRec: input.target.value,
      });
    }
    if (input.target.id === 'ingredientsInput') {
      this.setState({
        localIngredients: input.target.value,
      });
    }
    if (input.target.id === 'directionsInput') {
      this.setState({
        localDirections: input.target.value,
      });
    }
  };

  finish = () => {
    const { ...destructProps } = this.props;
    const { ...destructState } = this.state;
    const regX = /\S/;
    if (
      destructState.localCurrentRec.match(regX) === null ||
      destructState.localIngredients.match(regX) === null ||
      destructState.localDirections.match(regX) === null
    ) {
      alert('Please Complete Recipe Form');
      return;
    }
    const update = (updateListItems, updateCurrentRec, updateRecArr) => {
      destructProps.dispatch(listItems(updateListItems));
      destructProps.dispatch(currentRecipe(updateCurrentRec));
      destructProps.dispatch(recipeArray(updateRecArr));
      this.cancel();
    };
    if (destructProps.editOrAdd === 'add') {
      if (destructProps.listItems.length === 8) {
        alert('Maximum amount of recipes has been reached.');
        return;
      }
      if (destructProps.listItems.some(item => item === destructState.localCurrentRec.trim()) === true) {
        alert('Cannot have duplicate names of recipes');
        return;
      }
      const newListItems = destructProps.listItems.slice(0);
      newListItems.push(destructState.localCurrentRec);
      const newCurrentRecipe = newListItems[newListItems.length - 1];
      const newRecipeArray = destructProps.stateRecArr.slice(0);
      newRecipeArray.push({
        Name: destructState.localCurrentRec,
        Ingredients: destructState.localIngredients,
        Directions: destructState.localDirections,
      });
      update(newListItems.slice(0), newCurrentRecipe, newRecipeArray.slice(0));
      window.localStorage.setItem('recipeArr', JSON.stringify(newRecipeArray.slice(0)));
    }
    if (destructProps.editOrAdd === 'edit') {
      const duplicateRecName = destructProps.listItems
        .slice(0)
        .filter(item => item !== destructProps.currentRecipe);
      if (duplicateRecName.some(item => item === destructState.localCurrentRec) === true) {
        alert('Cannot have duplicate names of recipes');
        return;
      } 
      const newListItems = destructProps.listItems.slice(0);
      newListItems[newListItems.indexOf(destructProps.currentRecipe)] = destructState.localCurrentRec;
      const newCurrentRecipe = newListItems[newListItems.indexOf(destructState.localCurrentRec)];
      const newRecipeArray = destructProps.stateRecArr.slice(0);
      for (let i = 0; i < newRecipeArray.length; i++) {
        if (newRecipeArray[i].Name === destructProps.currentRecipe) {
          newRecipeArray[i].Name = destructState.localCurrentRec;
          newRecipeArray[i].Ingredients = destructState.localIngredients;
          newRecipeArray[i].Directions = destructState.localDirections;
          update(newListItems.slice(0), newCurrentRecipe, newRecipeArray.slice(0));
          window.localStorage.setItem('recipeArr', JSON.stringify(newRecipeArray.slice(0)));
          return;
        }
      }
    }
  };

  cancel = () => {
    const { ...destructProps } = this.props;
    destructProps.dispatch(modify(false));
  };

  disableBtns = input => {
    const { ...destructProps } = this.props;
    destructProps.dispatch(disableBtns(input));
  };

  render() {
    const { ...destructProps } = this.props;
    return (
      <div id="recipeDiv">
        <div>
          <h3 data-testid="addEditHeader">
            {destructProps.editOrAdd === 'add' ? 'Add a Recipe' : 'Edit Recipe'}
          </h3>
        </div>
        <div id="inputs">
          <p>Recipe:</p>
          <input
            type="text"
            className="recipeDivClass"
            id="recipeDivInput"
            data-testid="recipeName"
            defaultValue={destructProps.editOrAdd === 'add' ? '' : destructProps.currentRecipe}
            placeholder="Recipe Name"
            onChange={this.changeFunc}
          />
          <p>Ingredients:</p>
          <textarea
            type="text"
            className="recipeDivClass"
            data-testid="recipeIngredients"
            id="ingredientsInput"
            defaultValue={destructProps.editOrAdd === 'add' ? '' : destructProps.ingredients}
            placeholder="Seperate each ingredient with a *"
            onChange={this.changeFunc}
          />
          <p>Directions:</p>
          <textarea
            type="text"
            className="recipeDivClass"
            data-testid="recipeDirections"
            id="directionsInput"
            defaultValue={destructProps.editOrAdd === 'add' ? '' : destructProps.directions}
            placeholder="Seperate each direction with a *"
            onChange={this.changeFunc}
          />
          <br />
          <button type="button" data-testid="finishButton" onClick={this.finish}>
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
