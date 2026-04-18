import { createAction, props } from '@ngrx/store';
import { Recipe } from '../../core/domain/models/recipe/recipe.model';
import { RecipePreferences } from '../../core/domain/value-objects/recipe-preferences.vo';

export const setRecipeSelected = createAction(
  '[Recipe] Set Recipe Selected',
  props<{ recipeId: number }>(),
);
export const getRecipesRequested = createAction(
  '[Recipe] Get Recipes Requested',
  props<{ prompt: string; preferences: RecipePreferences }>(),
);
export const getRecipesRequestedSuccess = createAction(
  '[Recipe] Get Recipes Requested Success',
  props<{ recipes: Recipe[] }>(),
);
export const getRecipesRequestedFailure = createAction(
  '[Recipe] Get Recipes Requested Failure',
  props<{ error: { status: number; message: string } }>(),
);
