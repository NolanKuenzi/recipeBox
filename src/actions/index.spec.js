import { LIST_ITEMS, CURRENT_RECIPE, EDIT_OR_ADD, MODIFY } from '../constants/action-types';
import { listItems, currentRecipe, editOrAdd, modify } from './index';

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
  test('modify creats an action which returns a boolean', () => {
    const mod = false;
    const expectedAction = item => ({
      type: MODIFY,
      item,
    });
    expect(modify(mod)).toEqual(expectedAction(mod));
  });
});
