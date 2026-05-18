import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Recipe } from '../../core/domain/models/recipe/recipe.model';
import { RecipePreferences } from '../../core/domain/value-objects/recipe-preferences.vo';
import {
  getRecipesRequested,
  setRecipeSelected,
} from '../actions/recipes.actions';
import { AppState } from '../app.state';
import {
  selectRequestedRecipes,
  selectSelectedRecipe,
  selectSelectedRecipeId,
} from '../selectors/recipes.selector';

@Injectable({ providedIn: 'root' })
export class RecipesFacade {
  readonly requestedRecipes$: Observable<Recipe[]> = this.store.select(
    selectRequestedRecipes,
  );

  constructor(private readonly store: Store<AppState>) {}

  get returnRecipesRequested() {
    return this.requestedRecipes$;
  }

  get selectedRecipe(): Observable<Recipe | null> {
    const _id = this.store.select(selectSelectedRecipe);
    return this.store.select(selectSelectedRecipeId).pipe(
      map((id) => {
        if (id === null) return null;
        let selectedRecipe: Recipe | null = null;
        this.requestedRecipes$
          .subscribe((recipes) => {
            selectedRecipe = recipes.find((r: Recipe) => r._id === id) || null;
          })
          .unsubscribe();
        return selectedRecipe;
      }),
    );
  }

  setRecipeSelected(recipeId: string): void {
    this.store.dispatch(setRecipeSelected({ recipeId }));
  }

  getRecipesRequested(prompt: string, preferences: RecipePreferences): void {
    this.store.dispatch(getRecipesRequested({ prompt, preferences }));
  }
}
