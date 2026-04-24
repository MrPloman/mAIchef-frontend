import { CuisineType } from './cuisine-type.vo';
import { Duration } from './duration.vo';
import { MealType } from './meal-type.vo';
import { RestrictionType } from './restriction-type.vo';
import { Servings } from './servings.vo';

export class RecipePreferences {
  private constructor(
    public readonly servings?: Servings,
    public readonly mealTypess?: MealType[],
    public readonly cuisineTypess?: CuisineType[],
    public readonly restrictions?: RestrictionType[],
    public readonly maxDuration?: Duration,
  ) {}

  static create(params: {
    servings?: Servings;
    mealTypess?: MealType[];
    cuisineTypess?: CuisineType[];
    restrictions?: RestrictionType[];
    maxDuration?: Duration;
  }): RecipePreferences {
    return new RecipePreferences(
      params.servings,
      params.mealTypess,
      params.cuisineTypess,
      params.restrictions,
      params.maxDuration,
    );
  }
}
