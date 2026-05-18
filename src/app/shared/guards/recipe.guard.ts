// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Recipe } from '../../core/domain/models/recipe/recipe.model';
import { RecipesFacade } from '../../store/facades/recipes.facade';
import { RecipesHelper } from '../helpers/recipes.helper';

export const recipeGuard: CanActivateFn = (route, state) => {
  const recipeFacade = inject(RecipesFacade).returnRecipesRequested;
  const router = inject(Router);
  const recipeHelper = inject(RecipesHelper);
  const _id = route.params['id'];
  let recipes: Recipe[] = [];
  recipeFacade.subscribe((recipeList) => {
    recipes = recipeList;
  });

  return recipeHelper.getRecipeById(_id, recipes)
    ? true
    : router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
};
