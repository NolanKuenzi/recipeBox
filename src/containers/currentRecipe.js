import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  LIST_ITEMS,
  CURRENT_RECIPE,
  EDIT_OR_ADD,
  MODIFY,
  REC_ARR,
} from '../constants/action-types';

const mapStateToProps = state => {
  return {
    listItems: state.listItems,
    currentRecipe: state.currentRecipe,
    stateRecArr: state.stateRecArr,
  };
};

class CurrentRec extends React.Component {
  edit = () => {
    const { ...destructProps } = this.props;
    if (destructProps.listItems.length === 0) {
      return;
    }
    const disableAddButton = document.getElementById('add');
    disableAddButton.disabled = true;
    destructProps.dispatch({ type: EDIT_OR_ADD, item: 'edit' });
    destructProps.dispatch({ type: MODIFY, item: true });
  };

  delete = () => {
    const { ...destructProps } = this.props;
    if (destructProps.listItems.length === 0) {
      return;
    }
    const deleteRecipe = destructProps.listItems.filter(
      item => item !== destructProps.currentRecipe,
    );
    const newRecipeArray = destructProps.stateRecArr.filter(
      item => item.Name !== destructProps.currentRecipe,
    );
    window.localStorage.setItem('recipeArr', JSON.stringify(destructProps.stateRecArr.slice(0)));
    destructProps.dispatch({ type: LIST_ITEMS, items: deleteRecipe });
    destructProps.dispatch({ type: CURRENT_RECIPE, item: deleteRecipe[0] });
    destructProps.dispatch({ type: REC_ARR, item: newRecipeArray.slice(0) });
    window.localStorage.setItem('recipeArr', JSON.stringify(newRecipeArray.slice(0)));
  };

  render() {
    const { ...destructProps } = this.props;
    return (
      <div id="recipeSectionHeader">
        <h2 id="RSH_Header">{destructProps.currentRecipe}</h2>
        <button
          type="button"
          className="editDelAddBtns"
          id="edit"
          data-testid="edit"
          onClick={this.edit}
        >
          Edit
        </button>
        <button
          type="button"
          className="editDelAddBtns"
          id="delete"
          data-testid="delete"
          onClick={this.delete}
        >
          Delete
        </button>
      </div>
    );
  }
}

CurrentRec.propTypes = {
  listItems: PropTypes.array,
  currentRecipe: PropTypes.string,
};

const CurrentRecipe = connect(mapStateToProps)(CurrentRec);

export default CurrentRecipe;
