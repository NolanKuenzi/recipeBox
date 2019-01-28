import React from 'react';
import Header from './header';
import RecipeList from '../containers/recipeList';
import CurrentRecipe from '../containers/currentRecipe';
import RecipeSection from './recipeSection';
import RecipeSectionFooter from '../containers/recipeSectionFooter';
import Footer from './footer';

const Main = () => (
  <div id="appContainer">
    <Header />
    <RecipeList />
    <CurrentRecipe />
    <RecipeSection />
    <RecipeSectionFooter />
    <Footer />
  </div>
);

export default Main;
