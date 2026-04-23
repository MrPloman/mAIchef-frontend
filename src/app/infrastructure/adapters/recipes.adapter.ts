// infrastructure/adapters/recipe-http.adapter.ts
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Recipe } from '../../core/domain/models/recipe/recipe.model';
import { RecipePreferences } from '../../core/domain/value-objects/recipe-preferences.vo';
import { RecipesRequestedAIPort } from '../../core/ports/recipes.ports';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeHttpAdapter implements RecipesRequestedAIPort {
  private http = inject(HttpService);
  private readonly endpoint = '/api/recipes';

  getRecipesRequested(
    prompt: string,
    preferences: RecipePreferences,
  ): Observable<Recipe[]> {
    return this.http.get<any[]>(this.endpoint);
  }
}
