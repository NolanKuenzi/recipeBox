import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { EDIT_OR_ADD, MODIFY } from '../constants/action-types';

const mapStateToProps = ({ dispatch }) => {
  return {
    dispatch,
  };
};
class RecSectionFooter extends React.Component {
  addRecipe = () => {
    const { ...destructProps } = this.props;
    destructProps.dispatch({ type: EDIT_OR_ADD, item: 'add' });
    destructProps.dispatch({ type: MODIFY, item: true });
  };

  render() {
    return (
      <div id="recipeSectionFooter">
        <div>
          <button type="button" className="editDelAddBtns" id="add" onClick={this.addRecipe}>
            Add Recipe
          </button>
        </div>
        <div id="source">
          <a
            href="https://www.womansday.com/food-recipes/food-drinks/g2373/vegetarian-recipes/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source for Recipes:
            https://www.womansday.com/food-recipes/food-drinks/g2373/vegetarian-recipes/
          </a>
        </div>
      </div>
    );
  }
}

RecSectionFooter.propTypes = {
  dispatch: PropTypes.func,
};

const RecipeSectionFooter = connect(mapStateToProps)(RecSectionFooter);

export default RecipeSectionFooter;
