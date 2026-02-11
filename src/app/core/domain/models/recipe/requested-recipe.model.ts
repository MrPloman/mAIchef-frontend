import { Difficulty } from '../../value-objects/difficulty.vo';
import { Ingredient } from '../../value-objects/ingredient.vo';

export class RequestedRecipe {
  private constructor(
    public readonly _id: string,
    public readonly title: string,
    public readonly shortDescription: string,
    public readonly difficulty: Difficulty,
    public readonly estimatedTimeInMinutes: number,
    public readonly servings: number,
    public readonly ingredientsSummary: Ingredient[],
    public readonly createdAt: Date = new Date(),
  ) {}

  static create(params: {
    _id: string;
    title: string;
    shortDescription: string;
    difficulty: Difficulty;
    estimatedTimeInMinutes: number;
    servings: number;
    ingredientsSummary: Ingredient[];
  }): RequestedRecipe {
    if (!params.title) throw new Error('Must have title');
    if (!params.ingredientsSummary.length)
      throw new Error('Must have ingredient summary');

    return new RequestedRecipe(
      params._id,
      params.title,
      params.shortDescription,
      params.difficulty,
      params.estimatedTimeInMinutes,
      params.servings,
      params.ingredientsSummary,
    );
  }
}
