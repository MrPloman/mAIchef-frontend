// recipe.mapper.ts

import {
  IngredientDto,
  RecipeDto,
  RecipeStepDto,
} from '../../core/domain/dtos/recipe.dto';
import { RecipeStep } from '../../core/domain/models/recipe/recipe-step.model';
import { Recipe } from '../../core/domain/models/recipe/recipe.model';
import { Difficulty } from '../../core/domain/value-objects/difficulty.vo';
import { Duration } from '../../core/domain/value-objects/duration.vo';
import { IngredientName } from '../../core/domain/value-objects/ingredient-name.vo';
import { Ingredient } from '../../core/domain/value-objects/ingredient.vo';
import { Quantity } from '../../core/domain/value-objects/quantity.vo';
import { StepInstruction } from '../../core/domain/value-objects/step-instruction.vo';
import { StepOrder } from '../../core/domain/value-objects/step-order.vo';
import { Unit } from '../../core/domain/value-objects/unit.vo';

export class RecipeMapper {
  static toDomain(dto: RecipeDto): Recipe {
    return Recipe.fromPersistence({
      _id: dto._id,
      version: dto.version,
      title: dto.title,
      description: dto.description,
      difficulty: Difficulty.from(dto.difficulty),
      estimatedTimeInMinutes: dto.estimatedTimeInMinutes,
      servings: dto.servings,
      ingredients: dto.ingredients.map(RecipeMapper.toIngredient),
      steps: dto.steps.map(RecipeMapper.toStep),
      createdAt: new Date(dto.createdAt),
      userId: dto.userId,
      parentRecipeId: dto.parentRecipeId,
    });
  }

  static toDomainList(dtos: RecipeDto[]): Recipe[] {
    return dtos.map(RecipeMapper.toDomain);
  }

  // ─── Private helpers ───────────────────────────────────────────────────────

  private static toIngredient(dto: IngredientDto): Ingredient {
    return new Ingredient(
      new IngredientName(dto.name),
      new Quantity(dto.quantity),
      new Unit(dto.unit),
      dto.notes ?? '',
    );
  }

  private static toStep(dto: RecipeStepDto): RecipeStep {
    return new RecipeStep(
      new StepOrder(dto.order),
      new StepInstruction(dto.instruction),
      dto.duration ? Duration.create(dto.duration) : undefined,
      dto.tips ?? [],
    );
  }
}
