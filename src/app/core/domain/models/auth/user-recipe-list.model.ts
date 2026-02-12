import { Recipe } from '../recipe/recipe.model';

export class UserRecipeList {
  private readonly recipes: Recipe[];

  private constructor(
    public readonly userId: string,
    initialRecipes?: Recipe[],
    public readonly createdAt?: Date,
  ) {
    this.recipes = initialRecipes ?? [];
    this.createdAt = createdAt ?? new Date();
  }

  static create(userId: string, initialRecipes?: Recipe[]): UserRecipeList {
    if (!userId) throw new Error('UserId is required');
    return new UserRecipeList(userId, initialRecipes);
  }

  addRecipe(recipe: Recipe): void {
    if (this.recipes.some((r) => r._id === recipe._id)) {
      throw new Error('Recipe already exists in user list');
    }
    this.recipes.push(recipe);
  }

  removeRecipe(recipeId: string): void {
    const index = this.recipes.findIndex((r) => r._id === recipeId);
    if (index === -1) throw new Error('Recipe not found in user list');
    this.recipes.splice(index, 1);
  }

  getRecipe(recipeId: string): Recipe | null {
    return this.recipes.find((r) => r._id === recipeId) ?? null;
  }

  listRecipes(): Recipe[] {
    return [...this.recipes]; // devolver copia para inmutabilidad
  }

  contains(recipeId: string): boolean {
    return this.recipes.some((r) => r._id === recipeId);
  }

  count(): number {
    return this.recipes.length;
  }
}
