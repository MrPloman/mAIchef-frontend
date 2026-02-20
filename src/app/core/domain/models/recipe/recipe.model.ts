import { Difficulty } from '../../value-objects/difficulty.vo';
import { Ingredient } from '../../value-objects/ingredient.vo';
import { RecipeStep } from './recipe-step.model';

export class Recipe {
  private constructor(
    public readonly _id: string,
    public readonly version: number,
    public readonly title: string,
    public readonly description: string,
    public readonly difficulty: Difficulty,
    public readonly estimatedTimeInMinutes: number,
    public readonly servings: number,
    public readonly ingredients: Ingredient[],
    public readonly steps: RecipeStep[],
    public readonly createdAt: Date,
    public readonly userId?: string,
    public readonly parentRecipeId?: string,
  ) {}

  static create(params: {
    _id: string;
    version: number;
    title: string;
    description: string;
    difficulty: Difficulty;
    estimatedTimeInMinutes: number;
    servings: number;
    ingredients: Ingredient[];
    steps: RecipeStep[];
    userId?: string; // opcional
    parentRecipeId?: string;
  }): Recipe {
    // validaciones...
    return new Recipe(
      params._id,
      params.version,
      params.title,
      params.description,
      params.difficulty,
      params.estimatedTimeInMinutes,
      params.servings,
      params.ingredients,
      params.steps,
      new Date(),
      params.userId,
      params.parentRecipeId,
    );
  }
}
