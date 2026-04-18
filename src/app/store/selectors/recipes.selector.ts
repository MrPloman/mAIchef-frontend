import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipesState } from '../state/recipes.state';

export const RECIPES_FEATURE_KEY = 'recipes';

export const selectRecipesState =
  createFeatureSelector<RecipesState>(RECIPES_FEATURE_KEY);

export const selectRequestedRecipes = createSelector(
  selectRecipesState,
  (recipesState) => recipesState.recipes,
);
export const selectSelectedRecipe = createSelector(
  selectRecipesState,
  (recipesState) => recipesState.selectedRecipe,
);
