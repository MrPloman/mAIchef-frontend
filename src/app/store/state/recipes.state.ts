import { Recipe } from '../../core/domain/models/recipe/recipe.model';

export interface RecipesState {
  recipes: Recipe[];
  selectedRecipe: number | null;
}
export const initialRecipesState: RecipesState = {
  recipes: [],
  selectedRecipe: null,
};
