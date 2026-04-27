// infrastructure/adapters/recipe-http.adapter.ts
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Recipe } from '../../core/domain/models/recipe/recipe.model';
import { RecipePreferences } from '../../core/domain/value-objects/recipe-preferences.vo';
import { RecipesRequestedAIPort } from '../../core/ports/recipes.ports';
import { HttpService } from '../http/http.service';
import { RecipeMapper } from '../mapers/recipe.mapper';

@Injectable({
  providedIn: 'root',
})
export class RecipeHttpAdapter implements RecipesRequestedAIPort {
  private http = inject(HttpService);
  private readonly endpoint = '/ai/generate';
  getRecipesRequested(
    prompt: string,
    preferences: RecipePreferences,
  ): Observable<Recipe[]> {
    return this.http
      .post<any[]>(this.endpoint, { prompt, preferences })
      .pipe(map((response) => response.map(RecipeMapper.toDomain)));
  }
}
