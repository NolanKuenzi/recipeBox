import { LIST_ITEMS, CURRENT_RECIPE, EDIT_OR_ADD, MODIFY } from '../constants/action-types';

export const listItems = items => ({
  type: LIST_ITEMS,
  items,
});

export const currentRecipe = item => ({
  type: CURRENT_RECIPE,
  item,
});

export const editOrAdd = item => ({
  type: EDIT_OR_ADD,
  item,
});

export const modify = item => ({
  type: MODIFY,
  item,
});
