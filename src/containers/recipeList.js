import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { currentRecipe } from '../actions/index';

const mapStateToProps = state => {
  return { listItems: state.listItems.slice(0), currentRecipe: state.currentRecipe };
};

class RecList extends React.Component {
  itemClick = event => {
    const { ...destructProps } = this.props;
    const newCurrentRec = event.target.id;
    destructProps.dispatch(currentRecipe(newCurrentRec));
  };

  render() {
    const { ...destructProps } = this.props;
    return (
      <div id="listContent">
        <ul data-testid="recipeListUl">
          <h3>
            {destructProps.listItems.map(item => (
              <li
                key={item}
                className="listItem"
                id={item}
                onClick={this.itemClick}
                role="presentation"
                data-testid="recipeListItem"
                style={
                  destructProps.currentRecipe === item
                    ? { backgroundColor: 'rgb(0, 179, 134)', border: 'thin solid white' }
                    : { backgroundColor: 'rgb(128,51,0)', border: 'rgb(128,51,0)' }
                }
              >
                {item}
              </li>
            ))}
          </h3>
        </ul>
      </div>
    );
  }
}

RecList.propTypes = {
  listItems: PropTypes.array,
  currentRecipe: PropTypes.string,
};

const RecipeList = connect(mapStateToProps)(RecList);
export default RecipeList;
