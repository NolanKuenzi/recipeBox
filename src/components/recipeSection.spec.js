import React from 'react';
import { cleanup, render } from 'react-testing-library';
import { RecSec } from './recipeSection';

const props = {
  Ingredients: 'Tomatoes, potatoes, and peanut butter',
  Directions: 'Step 1, Step 2, Step 3, etc...',
  Modify: false,
};

afterEach(cleanup);
describe('<RecSec /> Component', () => {
  test('Ingredients section displays props.Ingredients', () => {
    const { getByTestId } = render(<RecSec {...props} />);
    const testIngredients = getByTestId('recSecIngredients');
    expect(testIngredients.textContent).toBe(props.Ingredients);
  });
  test('Directions section displays props.Directions', () => {
    const { getByTestId } = render(<RecSec {...props} />);
    const testDirections = getByTestId('recSecDirections');
    expect(testDirections.textContent).toBe(props.Directions);
  });
  test("If recSecModify's textContent is an empty string then props.Modify is false", () => {
    const { getByTestId } = render(<RecSec {...props} />);
    const testModify = getByTestId('recSecModify');
    expect(testModify.textContent).toBe('');
    expect(props.Modify).toBe(false);
  });
});
