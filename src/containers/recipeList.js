import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CURRENT_RECIPE } from '../constants/action-types';

const mapStateToProps = state => {
  return { listItems: state.listItems.slice(0), currentRecipe: state.currentRecipe };
};

class RecList extends React.Component {
  componentDidMount() {
    const { ...destructProps } = this.props;
    if (destructProps.currentRecipe === '') {
      return;
    }
    this.BackGround(destructProps.currentRecipe);
  }

  componentDidUpdate() {
    const { ...destructProps } = this.props;
    if (destructProps.currentRecipe === '' || destructProps.currentRecipe === undefined) {
      return;
    }
    this.BackGround(destructProps.currentRecipe);
  }

  componentWillUnmount() {
    this.BackGround(null);
  }

  BackGround = input => {
    const ulBg = document.getElementsByClassName('listItem');
    for (let i = 0; i < ulBg.length; i++) {
      ulBg[i].style.backgroundColor = '#803300';
      ulBg[i].style.border = 'thin solid #803300';
    }
    if (input === null) {
      return;
    }
    const currentRecBgColor = document.getElementById(input);
    if (currentRecBgColor.style.backgroundColor !== 'rgb(0, 179, 134)') {
      currentRecBgColor.style.backgroundColor = 'rgb(0, 179, 134)';
      currentRecBgColor.style.border = 'thin solid white';
    }
  };

  itemClick = event => {
    const { ...destructProps } = this.props;
    const newCurrentRec = event.target.id;
    destructProps.dispatch({ type: CURRENT_RECIPE, item: newCurrentRec });
    this.BackGround(event.target.id);
  };

  render() {
    const { ...destructProps } = this.props;
    return (
      <div id="listContent">
        <ul>
          <h3>
            {destructProps.listItems.map(item => (
              <li
                key={item}
                className="listItem"
                id={item}
                data-testid="recipeListItem"
                onClick={this.itemClick}
                role="presentation"
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
};

export { RecList };
const RecipeList = connect(mapStateToProps)(RecList);
export default RecipeList;
