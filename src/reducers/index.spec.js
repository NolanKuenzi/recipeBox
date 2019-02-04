/* eslint-disable */
import rootReducer from './index';
import {
  LIST_ITEMS,
  CURRENT_RECIPE,
  EDIT_OR_ADD,
  MODIFY,
  REC_ARR,
  DISABLE_BTNS,
} from '../constants/action-types';
import { recipeArray, initialState } from './index';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    expect(rootReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle LIST_ITEMS', () => {
    const listItem = ['pb&j'];
    const action = { type: LIST_ITEMS, items: listItem };
    expect(rootReducer(undefined, action)).toEqual({
      listItems: listItem,
      currentRecipe: recipeArray.length > 0 ? recipeArray[0].Name : '',
      editOrAdd: 'add',
      modify: false,
      stateRecArr: recipeArray.slice(0),
      disableBtns: false,
    });
  });
  it('should handle CURRENT_RECIPE', () => {
    const currentRec = 'ranchDressing';
    const action = { type: CURRENT_RECIPE, item: currentRec };
    expect(rootReducer(undefined, action)).toEqual({
      listItems: recipeArray.length > 0 ? recipeArray.map(item => item.Name) : [],
      currentRecipe: currentRec,
      editOrAdd: 'add',
      modify: false,
      stateRecArr: recipeArray.slice(0),
      disableBtns: false,
    });
  });
  it('should handle EDIT_OR_ADD', () => {
    const action = { type: EDIT_OR_ADD, item: 'edit' };
    expect(rootReducer(undefined, action)).toEqual({
      listItems: recipeArray.length > 0 ? recipeArray.map(item => item.Name) : [],
      currentRecipe: recipeArray.length > 0 ? recipeArray[0].Name : '',
      editOrAdd: 'edit',
      modify: false,
      stateRecArr: recipeArray.slice(0),
      disableBtns: false,
    });
  });
  it('should handle MODIFY', () => {
    const action = { type: MODIFY, item: true };
    expect(rootReducer(undefined, action)).toEqual({
      listItems: recipeArray.length > 0 ? recipeArray.map(item => item.Name) : [],
      currentRecipe: recipeArray.length > 0 ? recipeArray[0].Name : '',
      editOrAdd: 'add',
      modify: true,
      stateRecArr: recipeArray.slice(0),
      disableBtns: false,
    });
  });
  it('should handle REC_ARR', () => {
    const recArr = ['More recipes more problems'];
    const action = { type: REC_ARR, item: recArr };
    expect(rootReducer(undefined, action)).toEqual({
      listItems: recipeArray.length > 0 ? recipeArray.map(item => item.Name) : [],
      currentRecipe: recipeArray.length > 0 ? recipeArray[0].Name : '',
      editOrAdd: 'add',
      modify: false,
      stateRecArr: recArr,
      disableBtns: false,
    });
  });
  it('should handle  DISABLE_BTNS', () => {
    const disableButtons = true;
    const action = { type: DISABLE_BTNS, item: disableButtons };
    expect(rootReducer(undefined, action)).toEqual({
      listItems: recipeArray.length > 0 ? recipeArray.map(item => item.Name) : [],
      currentRecipe: recipeArray.length > 0 ? recipeArray[0].Name : '',
      editOrAdd: 'add',
      modify: false,
      stateRecArr: recipeArray.slice(0),
      disableBtns: disableButtons,
    });
  });
});