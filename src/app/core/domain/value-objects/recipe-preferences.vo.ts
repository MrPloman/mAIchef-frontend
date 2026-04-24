import { CuisineType } from './cuisine-type.vo';
import { Duration } from './duration.vo';
import { MealType } from './meal-type.vo';
import { RestrictionType } from './restriction-type.vo';
import { Servings } from './servings.vo';

export class RecipePreferences {
  private constructor(
    public readonly servings?: Servings,
    public readonly mealType?: MealType[],
    public readonly cuisineTypes?: CuisineType[],
    public readonly restrictions?: RestrictionType[],
    public readonly maxDuration?: Duration,
  ) {}

  static create(params: {
    servings?: Servings;
    mealType?: MealType[];
    cuisineTypes?: CuisineType[];
    restrictions?: RestrictionType[];
    maxDuration?: Duration;
  }): RecipePreferences {
    return new RecipePreferences(
      params.servings,
      params.mealType,
      params.cuisineTypes,
      params.restrictions,
      params.maxDuration,
    );
  }
}
