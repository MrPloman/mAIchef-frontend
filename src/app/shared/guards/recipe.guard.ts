// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Recipe } from '../../core/domain/models/recipe/recipe.model';
import { RecipesFacade } from '../../store/facades/recipes.facade';
import { RecipesHelper } from '../helpers/recipes.helper';

export const recipeDetailGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const recipeFacade = inject(RecipesFacade);
  const recipeHelper = inject(RecipesHelper);

  const _id = route.params['id'];
  let recipes: Recipe[] = [];
  recipeFacade.returnRecipesRequested.subscribe((recipeList) => {
    recipes = recipeList;
  });

  return recipeHelper.getRecipeById(_id, recipes)
    ? true
    : router.navigate(['/home']);
};

export const recipesRequestedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const recipeFacade = inject(RecipesFacade);
  let recipes: Recipe[] = [];
  recipeFacade.returnRecipesRequested.subscribe((recipeList) => {
    recipes = recipeList;
  });
  if (recipes.length > 0) {
    return true;
  } else {
    return router.navigate(['/home']);
  }
};
