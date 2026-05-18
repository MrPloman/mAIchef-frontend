import { Injectable } from '@angular/core';
import { Recipe } from '../../core/domain/models/recipe/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  constructor() {}

  private parseSingleRecipe(response: any): Recipe {
    return Recipe.create({
      _id: response._id,
      title: response.title,
      description: response.description,
      difficulty: response.difficulty,
      estimatedTimeInMinutes: response.estimatedTimeInMinutes,
      servings: response.servings,
      ingredients: response.ingredients,
      steps: response.steps,
      userId: response.userId,
      parentRecipeId: response.parentRecipeId,
      version: response.version,
    });
  }
  public parseRecipeResponseToModel(response: Recipe[]): any {
    return response.map((recipe) => this.parseSingleRecipe(recipe));
  }
}
