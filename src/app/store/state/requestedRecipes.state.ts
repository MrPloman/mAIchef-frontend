import { Recipe } from '../../core/domain/models/recipe/recipe.model';

export interface RequestedRecipesState {
  requestedRecipes: Recipe[];
}
