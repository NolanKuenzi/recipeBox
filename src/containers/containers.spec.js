import React from 'react';
import { Provider } from 'react-redux';
import { render, cleanup, fireEvent } from 'react-testing-library';
import store from '../store/index';
import RecipeList from './recipeList';
import CurrentRecipe from './currentRecipe';
import RecipeSection from '../components/recipeSection';
import RecipeSectionFooter from './recipeSectionFooter';

afterEach(cleanup);

function RenderComponent() {
  return render(
    <Provider store={store()}>
      <RecipeList />
      <CurrentRecipe />
      <RecipeSection />
      <RecipeSectionFooter />
    </Provider>,
  );
}

describe('<RecpieList /> component', () => {
  test('An <li /> displays a recipe on the recipe list', () => {
    const { getByTestId } = RenderComponent();
    const testRecipeList = getByTestId('recipeListItem');
    expect(testRecipeList.textContent).toEqual('Asparagus & Potato Pizza');
  });
  test('Clicking on an <li /> changes the <CurrentRecipe /> component', () => {
    const { getByText, getByTestId } = RenderComponent();
    const testLiClick = getByText('Cider-Glazed Brussels Sprouts');
    const currentRecText = getByTestId('curentRecTest');
    fireEvent.click(testLiClick);
    expect(currentRecText.textContent).toEqual('Cider-Glazed Brussels Sprouts');
  });
  test('Clicking on an <li /> changes the <RecipeSection /> component', () => {
    const { getByText, getByTestId } = RenderComponent();
    const testLiClick = getByText('Cider-Glazed Brussels Sprouts');
    const ingredientsSec = getByTestId('ingredientsSec');
    const directionsSec = getByTestId('directionsSec');
    fireEvent.click(testLiClick);
    expect(ingredientsSec.textContent).toContain('1/2 c. Dried Cranberries');
    expect(directionsSec.textContent).toContain(
      'Add 1⁄2 teaspoon salt and the Brussels sprouts and cook,',
    );
  });
});

describe('<CurrentRecipe component />', () => {
  test('Clicking the delete button deletes an item off of the recipeList ', () => {
    const { getByTestId } = RenderComponent();
    const testListItem = getByTestId('recipeListUl');
    expect(testListItem.textContent).toContain('Asparagus & Potato Pizza');
    const deleteButton = getByTestId('delete');
    fireEvent.click(deleteButton);
    expect(testListItem.textContent).toBe('Cider-Glazed Brussels SproutsSpaghetti Squash');
    fireEvent.click(deleteButton);
    expect(testListItem.textContent).toBe('Spaghetti Squash');
    fireEvent.click(deleteButton);
    expect(testListItem.textContent).toBe('');
  });
  test('Clicking the Edit button renders the <AddEditRecipes /> component', () => {
    const { getByTestId } = RenderComponent();
    const editButton = getByTestId('edit');
    const recSec = getByTestId('recSecModify');
    expect(recSec.textContent).toEqual('');
    fireEvent.click(editButton);
    expect(recSec.textContent).toContain('1 lb. pizza dough');
    expect(recSec.textContent).toContain('Heat oven to 425°F. Dust a baking sheet with cornmeal.');
  });
  test(`Editing the current recipe will update RecipeList, CurrentRecipe, 
  and RecipeSection components`, () => {
    const { getByTestId } = RenderComponent();
    const editButton = getByTestId('edit');
    fireEvent.click(editButton);
    const recipeNameInput = getByTestId('recipeName');
    const currentRecName = getByTestId('curentRecTest');
    const recipeListUl = getByTestId('recipeListUl');
    const recIngredientsInput = getByTestId('recipeIngredients');
    const recDirectionsInput = getByTestId('recipeDirections');
    const ingredientsSecion = getByTestId('ingredientsSec');
    const directionsSection = getByTestId('directionsSec');
    const finishButton = getByTestId('finishButton');
    fireEvent.change(recipeNameInput, { target: { value: 'Asparagus & Carrot Pizza' } });
    fireEvent.change(recIngredientsInput, { target: { value: '12 Carrots' } });
    fireEvent.change(recDirectionsInput, {
      target: { value: 'Chop the carrots up into tiny squares' },
    });
    fireEvent.click(finishButton);
    expect(recipeListUl.textContent).toContain('Asparagus & Carrot Pizza');
    expect(currentRecName.textContent).toBe('Asparagus & Carrot Pizza');
    expect(ingredientsSecion.textContent).toContain('12 Carrots');
    expect(directionsSection.textContent).toContain('Chop the carrots up into tiny squares');
  });
});
describe('<RecipeSectionFooter />', () => {
  test(`Clicking the Add Recipe button renders the <AddEditRecipes /> component with 
    blank input fields`, () => {
    const { getByTestId } = RenderComponent();
    const addButton = getByTestId('add');
    fireEvent.click(addButton);
    const ingredientsSecion = getByTestId('ingredientsSec');
    const directionsSection = getByTestId('directionsSec');
    expect(ingredientsSecion.textContent).toBe('');
    expect(directionsSection.textContent).toBe('');
  });

  test(`Adding a recipe will update RecipeList, CurrentRecipe, 
  and RecipeSection components`, () => {
    const { getByTestId } = RenderComponent();
    const addButton = getByTestId('add');
    fireEvent.click(addButton);
    const recipeListUl = getByTestId('recipeListUl');
    const recipeNameInput = getByTestId('recipeName');
    const recIngredientsInput = getByTestId('recipeIngredients');
    const recDirectionsInput = getByTestId('recipeDirections');
    const currentRecName = getByTestId('curentRecTest');
    const ingredientsSecion = getByTestId('ingredientsSec');
    const directionsSection = getByTestId('directionsSec');
    const finishButton = getByTestId('finishButton');
    fireEvent.change(recipeNameInput, { target: { value: 'Egg Salad Sandwhich' } });
    fireEvent.change(recIngredientsInput, { target: { value: 'Eggs and Mayo' } });
    fireEvent.change(recDirectionsInput, { target: { value: 'Mix in bowl then place on bread' } });
    fireEvent.click(finishButton);
    expect(recipeListUl.textContent).toContain('Egg Salad Sandwhich');
    expect(currentRecName.textContent).toBe('Egg Salad Sandwhich');
    expect(ingredientsSecion.textContent).toContain('Eggs and Mayo');
    expect(directionsSection.textContent).toContain('Mix in bowl then place on bread');
  });
});
