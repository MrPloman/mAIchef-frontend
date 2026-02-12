import { RecipePreferences } from '../../value-objects/recipe-preferences.vo';

export class RecipeRequest {
  private constructor(
    public readonly prompt: string,
    public readonly preferences?: RecipePreferences,
  ) {}

  static create(params: {
    prompt: string;
    preferences?: RecipePreferences;
  }): RecipeRequest {
    if (!params.prompt || params.prompt.trim().length === 0) {
      throw new Error('Prompt cannot be empty');
    }

    return new RecipeRequest(params.prompt.trim(), params.preferences);
  }
}
