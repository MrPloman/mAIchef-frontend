import { Observable } from 'rxjs';
import { Recipe } from '../../domain/models/recipe/recipe.model';
import { RecipePreferences } from '../../domain/value-objects/recipe-preferences.vo';
import { RecipesRequestedAIPort } from '../../ports/recipes.ports';

export class RecipesRequestedUseCase {
  constructor(
    // private readonly chordsService: ChordsAnalyzerService,
    private readonly aiPort: RecipesRequestedAIPort,
  ) {}
  execute(
    prompt: string,
    preferences: RecipePreferences,
  ): Observable<Recipe[]> {
    return this.aiPort.getRecipesRequested(prompt, preferences);
  }
}
