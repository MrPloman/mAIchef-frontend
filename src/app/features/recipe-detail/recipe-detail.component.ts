import { Component, OnInit } from '@angular/core';
import { RecipeStep } from '../../core/domain/models/recipe/recipe-step.model';
import { Recipe } from '../../core/domain/models/recipe/recipe.model';
import { Difficulty } from '../../core/domain/value-objects/difficulty.vo';
import { Duration } from '../../core/domain/value-objects/duration.vo';
import { Ingredient } from '../../core/domain/value-objects/ingredient.vo';
import { StepInstruction } from '../../core/domain/value-objects/step-instruction.vo';
import { StepOrder } from '../../core/domain/value-objects/step-order.vo';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = MOCK_RECIPE;

  get difficultyClass(): string {
    return this.recipe.difficulty.getValue().toLowerCase();
  }

  get ingredientCount(): number {
    return this.recipe.ingredients.length;
  }

  get stepCount(): number {
    return this.recipe.steps.length;
  }

  ngOnInit(): void {
    // Replace with service call:
    // this.recipeService.getById(id).subscribe(r => (this.recipe = r));
  }

  forkRecipe(): void {
    // this.router.navigate(['/recipes/new'], { queryParams: { fork: this.recipe._id } });
  }

  formatTime(minutes: number): string {
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h} h ${m} min` : `${h} h`;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  formatStepDuration(step: RecipeStep): string | null {
    if (!step.hasDuration()) return null;
    return this.formatTime(step.duration!.getValue());
  }

  padOrder(order: number): string {
    return String(order).padStart(2, '0');
  }

  trackByOrder(_: number, step: RecipeStep): number {
    return step.order.getValue();
  }
}

// ── Mock ──────────────────────────────────────────────────────────────────────
const MOCK_RECIPE: Recipe = Recipe.fromPersistence({
  _id: 'rec_8f2a91d3',
  version: 2,
  title: 'Tagliatelle al Ragù Bolognese',
  description:
    'A slow-cooked Bolognese from the Emilia-Romagna tradition — ground veal and pork, a splash of whole milk, and a patience-rewarding four-hour simmer that turns a handful of humble ingredients into something extraordinary.',
  difficulty: Difficulty.from('MEDIUM'),
  estimatedTimeInMinutes: 240,
  servings: 4,
  createdAt: new Date('2025-04-14'),
  userId: 'usr_abc123',
  ingredients: [
    Ingredient.create({ name: 'ground veal', quantity: 300, unit: 'G' }),
    Ingredient.create({ name: 'ground pork', quantity: 200, unit: 'G' }),
    Ingredient.create({ name: 'fresh tagliatelle', quantity: 400, unit: 'G' }),
    Ingredient.create({ name: 'pancetta, diced', quantity: 120, unit: 'G' }),
    Ingredient.create({ name: 'white onion', quantity: 1, unit: 'UNIT' }),
    Ingredient.create({ name: 'celery stalks', quantity: 2, unit: 'UNIT' }),
    Ingredient.create({ name: 'medium carrot', quantity: 1, unit: 'UNIT' }),
    Ingredient.create({ name: 'dry white wine', quantity: 150, unit: 'ML' }),
    Ingredient.create({ name: 'whole milk', quantity: 100, unit: 'ML' }),
    Ingredient.create({
      name: 'San Marzano tomatoes',
      quantity: 200,
      unit: 'G',
    }),
    Ingredient.create({ name: 'unsalted butter', quantity: 30, unit: 'G' }),
    Ingredient.create({ name: 'Parmigiano Reggiano', quantity: 40, unit: 'G' }),
  ],
  steps: [
    new RecipeStep(
      StepOrder.create(1),
      StepInstruction.create(
        'Finely dice the onion, carrot, and celery into equal-sized pieces — this is your soffritto. In a heavy-bottomed pot over low heat, melt the butter and render the pancetta until the fat turns translucent. Add the soffritto and cook gently, stirring often, until completely softened and just beginning to turn golden.',
      ),
      Duration.create(15),
      [
        'Patience here pays dividends — rushing the soffritto yields a bitter base. Low and slow is the rule.',
      ],
    ),
    new RecipeStep(
      StepOrder.create(2),
      StepInstruction.create(
        'Raise the heat to medium-high. Add the ground veal and pork in two batches, breaking the meat apart with a wooden spoon. Allow each batch to brown properly — do not stir constantly. Season lightly with salt.',
      ),
      Duration.create(10),
      [
        'Browning creates the Maillard reaction — the deep savory base of the sauce. Avoid crowding the pot.',
      ],
    ),
    new RecipeStep(
      StepOrder.create(3),
      StepInstruction.create(
        'Pour in the white wine. Stir well, scraping any fond from the bottom of the pot. Let the wine reduce completely until the sharp alcohol smell is gone and the liquid has almost disappeared.',
      ),
      Duration.create(8),
    ),
    new RecipeStep(
      StepOrder.create(4),
      StepInstruction.create(
        'Add the whole milk, stir, and let it absorb into the meat over medium heat until fully evaporated. Then add the crushed San Marzano tomatoes. Stir everything together, reduce the heat to the lowest simmer, and cover with the lid slightly ajar.',
      ),
      Duration.create(210),
      [
        'The milk softens the acidity of the meat and prevents the sauce from turning sour during the long cook.',
        'Stir every 20–30 minutes. Add a ladleful of warm water if the sauce thickens too much.',
      ],
    ),
    new RecipeStep(
      StepOrder.create(5),
      StepInstruction.create(
        'Bring a large pot of heavily salted water to a rolling boil. Cook the fresh tagliatelle for 2–3 minutes, or until al dente. Reserve a full cup of starchy pasta water before draining.',
      ),
      Duration.create(3),
    ),
    new RecipeStep(
      StepOrder.create(6),
      StepInstruction.create(
        'Add the drained tagliatelle directly into the ragù. Toss over medium heat, adding pasta water a splash at a time until the sauce coats every strand. Plate immediately and finish with freshly grated Parmigiano Reggiano.',
      ),
      undefined,
      [
        'Tossing in the sauce — not topping it — is what makes a ragù become part of the pasta, not just sit on top.',
      ],
    ),
  ],
});
