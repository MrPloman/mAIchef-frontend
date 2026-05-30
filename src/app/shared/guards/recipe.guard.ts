// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Recipe } from '../../core/domain/models/recipe/recipe.model';
import { RecipesFacade } from '../../store/facades/recipes.facade';

export const recipeDetailGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const recipeFacade = inject(RecipesFacade);
  let recipe: Recipe | null = null;

  const recipeId = recipeFacade.selectedRecipe
    .subscribe((r) => (recipe = r))
    .unsubscribe();
  if (!recipe) return router.navigate(['/home']);
  else return true;
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
