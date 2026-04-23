import { createReducer, on } from '@ngrx/store';
import { getRecipesRequested } from '../actions/recipes.actions';
import { initialRecipesState, RecipesState } from '../state/recipes.state';

export const recipesReducer = createReducer<RecipesState>(
  initialRecipesState,
  on(getRecipesRequested, (state: RecipesState) => ({
    ...state,
    error: null,
  })),
);
