import { Recipe } from '../../core/domain/models/recipe/recipe.model';

export interface RecipesState {
  requestedRecipes: Recipe[];
  selectedRecipe: number | null;
}
