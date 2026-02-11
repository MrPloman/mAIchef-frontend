import { Difficulty } from '../value-objects/difficulty.vo';

export class RequestedRecipe {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly shortDescription: string,
    public readonly difficulty: Difficulty,
    public readonly estimatedTimeInMinutes: number,
    public readonly servings: number,
    public readonly ingredientsSummary: string[],
    public readonly sourcePrompt?: string,
    public readonly createdAt: Date = new Date(),
  ) {}

  static create(params: {
    id: string;
    title: string;
    shortDescription: string;
    difficulty: Difficulty;
    estimatedTimeInMinutes: number;
    servings: number;
    ingredientsSummary: string[];
    sourcePrompt?: string;
  }): RequestedRecipe {
    if (!params.title) throw new Error('Must have title');
    if (!params.ingredientsSummary.length)
      throw new Error('Must have ingredient summary');

    return new RequestedRecipe(
      params.id,
      params.title,
      params.shortDescription,
      params.difficulty,
      params.estimatedTimeInMinutes,
      params.servings,
      params.ingredientsSummary,
      params.sourcePrompt,
    );
  }
}
