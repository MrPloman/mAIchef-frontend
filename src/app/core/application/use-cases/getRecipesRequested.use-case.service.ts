import { RecipePreferences } from '../../domain/value-objects/recipe-preferences.vo';
import { RecipesRequestedAIPort } from '../../ports/recipes.ports';

export class RecipesRequestedUseCase {
  constructor(
    // private readonly chordsService: ChordsAnalyzerService,
    private readonly aiPort: RecipesRequestedAIPort,
  ) {}
  execute(prompt: string, preferences: RecipePreferences): Promise<any> {
    return this.aiPort.getRecipesRequested(prompt, preferences);
  }
}
