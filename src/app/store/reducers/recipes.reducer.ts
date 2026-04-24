import { createReducer, on } from '@ngrx/store';
import {
  getRecipesRequested,
  getRecipesRequestedFailure,
  getRecipesRequestedSuccess,
} from '../actions/recipes.actions';
import { initialRecipesState, RecipesState } from '../state/recipes.state';

export const recipesReducer = createReducer<RecipesState>(
  initialRecipesState,
  on(getRecipesRequested, (state: RecipesState) => ({
    recipes: [], // Clear recipes when a new request is made
    selectedRecipe: null, // Reset selected recipe
  })),
  on(getRecipesRequestedSuccess, (state: RecipesState, { recipes }) => ({
    recipes,
    selectedRecipe: null,
  })),
  on(getRecipesRequestedFailure, (state: RecipesState) => ({
    recipes: [], // Clear recipes on failure
    selectedRecipe: null, // Reset selected recipe
  })),
);
