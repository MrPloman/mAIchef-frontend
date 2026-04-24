import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../../domain/models/recipe/recipe.model';
import { RecipePreferences } from '../../domain/value-objects/recipe-preferences.vo';
import { RECIPES_REQUESTED_AI_PORT } from '../../ports/recipes.ports';

export class RecipesRequestedUseCase {
  constructor() {}
  private aiRequestedRecipesPort = inject(RECIPES_REQUESTED_AI_PORT);

  execute(
    prompt: string,
    preferences: RecipePreferences,
  ): Observable<Recipe[]> {
    return this.aiRequestedRecipesPort.getRecipesRequested(prompt, preferences);
  }
}
