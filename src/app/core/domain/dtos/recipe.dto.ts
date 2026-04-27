// recipe.dto.ts
export interface IngredientDto {
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export interface RecipeStepDto {
  order: number;
  duration: number;
  instruction: string;
  tips?: string[];
}

export interface RecipeDto {
  _id: string;
  version: number;
  title: string;
  description: string;
  difficulty: string;
  estimatedTimeInMinutes: number;
  servings: number;
  ingredients: IngredientDto[];
  steps: RecipeStepDto[];
  createdAt: string;
  userId?: string;
  parentRecipeId?: string;
}
