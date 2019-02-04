import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { listItems, currentRecipe, editOrAdd, modify, recipeArray } from '../actions/index';

const mapStateToProps = state => {
  return {
    listItems: state.listItems,
    currentRecipe: state.currentRecipe,
    stateRecArr: state.stateRecArr,
    disableBtns: state.disableBtns,
  };
};

class CurrentRec extends React.Component {
  edit = () => {
    const { ...destructProps } = this.props;
    if (destructProps.disableBtns === true) {
      return;
    }
    if (destructProps.listItems.length === 0) {
      return;
    }
    destructProps.dispatch(editOrAdd('edit'));
    destructProps.dispatch(modify(true));
  };

  delete = () => {
    const { ...destructProps } = this.props;
    if (destructProps.disableBtns === true) {
      return;
    }
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
    destructProps.dispatch(listItems(deleteRecipe));
    destructProps.dispatch(currentRecipe(deleteRecipe[0]));
    destructProps.dispatch(recipeArray(newRecipeArray.slice(0)));
    window.localStorage.setItem('recipeArr', JSON.stringify(newRecipeArray.slice(0)));
  };

  render() {
    const { ...destructProps } = this.props;
    return (
      <div id="recipeSectionHeader">
        <h2 id="RSH_Header" data-testid="curentRecTest">
          {destructProps.currentRecipe}
        </h2>
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
