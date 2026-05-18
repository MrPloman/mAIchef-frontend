import { Injectable } from '@angular/core';
import { Recipe } from '../../core/domain/models/recipe/recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipesHelper {
  getRecipeById(id: string, recipes: Recipe[]): Recipe | undefined {
    return recipes.find((recipe) => recipe._id === id);
  }
}
