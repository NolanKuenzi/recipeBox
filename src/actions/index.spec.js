import {
  LIST_ITEMS,
  CURRENT_RECIPE,
  EDIT_OR_ADD,
  MODIFY,
  REC_ARR,
  DISABLE_BTNS,
} from '../constants/action-types';
import { listItems, currentRecipe, editOrAdd, modify, recipeArray, disableBtns } from './index';

describe('Action objects returned from action-creator functions', () => {
  test('listItems creates an action which adds a list item', () => {
    const newListItem = 'pb&j_sandwhich';
    const expectedAction = items => ({
      type: LIST_ITEMS,
      items,
    });
    expect(listItems(newListItem)).toEqual(expectedAction(newListItem));
  });
  test('currentRecipe creates an action which updates the current recipe', () => {
    const newCurrentRec = 'Egg Salad';
    const expectedAction = item => ({
      type: CURRENT_RECIPE,
      item,
    });
    expect(currentRecipe(newCurrentRec)).toEqual(expectedAction(newCurrentRec));
  });
  test('editOrAdd creates action which returns "add" or "edit"', () => {
    const editAdd = 'edit';
    const expectedAction = item => ({
      type: EDIT_OR_ADD,
      item,
    });
    expect(editOrAdd(editAdd)).toEqual(expectedAction(editAdd));
  });
  test('modify creates an action which returns a boolean', () => {
    const mod = false;
    const expectedAction = item => ({
      type: MODIFY,
      item,
    });
    expect(modify(mod)).toEqual(expectedAction(mod));
  });
  test('recipeArray creates an action with returns an array of recipes', () => {
    const recArr = [
      { Name: 'testName', Ingredientts: 'ranch', directions: 'testDirections' },
      { Name: 'testName2', Ingredientts: 'ranch', directions: 'testDirections2' },
    ];
    const expectedAction = item => ({
      type: REC_ARR,
      item,
    });
    expect(recipeArray(recArr)).toEqual(expectedAction(recArr));
  });
  test('disableBtns creates an action with returns a boolean', () => {
    const disableButtons = false;
    const expectedAction = item => ({
      type: DISABLE_BTNS,
      item,
    });
    expect(disableBtns(disableButtons)).toEqual(expectedAction(disableButtons));
  });
});
