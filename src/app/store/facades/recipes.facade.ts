import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recipe } from '../../core/domain/models/recipe/recipe.model';
import { RecipePreferences } from '../../core/domain/value-objects/recipe-preferences.vo';
import {
  getRecipesRequested,
  setRecipeSelected,
} from '../actions/recipes.actions';
import { AppState } from '../app.state';
import { selectRequestedRecipes } from '../selectors/recipes.selector';

@Injectable({ providedIn: 'root' })
export class RecipesFacade {
  readonly requestedRecipes$: Observable<Recipe[]> = this.store.select(
    selectRequestedRecipes,
  );

  constructor(private readonly store: Store<AppState>) {}

  setRecipeSelected(recipeId: number): void {
    this.store.dispatch(setRecipeSelected({ recipeId }));
  }

  getRecipesRequested(prompt: string, preferences: RecipePreferences): void {
    this.store.dispatch(getRecipesRequested({ prompt, preferences }));
  }
}
