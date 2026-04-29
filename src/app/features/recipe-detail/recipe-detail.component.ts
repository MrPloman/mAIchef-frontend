import { Component, computed, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  // ── State ────────────────────────────────────────────────────────────────
  recipe = signal<Recipe | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  // ── Derived ──────────────────────────────────────────────────────────────
  difficultyClass = computed(() => {
    const diff = this.recipe()?.difficulty?.getValue()?.toLowerCase();
    return diff ?? 'medium';
  });

  ingredientCount = computed(() => this.recipe()?.ingredients?.length ?? 0);
  stepCount = computed(() => this.recipe()?.steps?.length ?? 0);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('Recipe not found.');
      this.loading.set(false);
      return;
    }

    // Replace with your RecipeService call, e.g.:
    // this.recipeService.getById(id).subscribe({
    //   next: (recipe) => { this.recipe.set(recipe); this.loading.set(false); },
    //   error: () => { this.error.set('Could not load recipe.'); this.loading.set(false); }
    // });

    this.recipe.set(MOCK_RECIPE);
    this.loading.set(false);
  }

  // ── Handlers ─────────────────────────────────────────────────────────────
  goBack(): void {
    this.router.navigate(['/recipes']);
  }

  forkRecipe(): void {
    const id = this.recipe()?._id;
    if (id)
      this.router.navigate(['/recipes/new'], { queryParams: { fork: id } });
  }

  // ── Helpers ──────────────────────────────────────────────────────────────
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

// ── Mock data (swap for service) ─────────────────────────────────────────────
import { RecipeStep } from '../../core/domain/models/recipe/recipe-step.model';
import { Recipe } from '../../core/domain/models/recipe/recipe.model';
import { Difficulty } from '../../core/domain/value-objects/difficulty.vo';
import { Duration } from '../../core/domain/value-objects/duration.vo';
import { Ingredient } from '../../core/domain/value-objects/ingredient.vo';
import { StepInstruction } from '../../core/domain/value-objects/step-instruction.vo';
import { StepOrder } from '../../core/domain/value-objects/step-order.vo';

const MOCK_RECIPE = Recipe.fromPersistence({
  _id: 'rec_8f2a91d3',
  version: 2,
  title: 'Tagliatelle al Ragù Bolognese',
  description:
    'A slow-cooked Bolognese from the Emilia-Romagna tradition — ground veal and pork, a splash of whole milk, and a patience-rewarding four-hour simmer that turns a handful of humble ingredients into something extraordinary.',
  difficulty: 'MEDIUM' as unknown as Difficulty,
  estimatedTimeInMinutes: 240,
  servings: 4,
  ingredients: [
    { name: 'ground veal', quantity: 300, unit: 'g' },
    { name: 'ground pork', quantity: 200, unit: 'g' },
    { name: 'fresh tagliatelle', quantity: 400, unit: 'g' },
    { name: 'pancetta, diced', quantity: 120, unit: 'g' },
    { name: 'white onion', quantity: 1, unit: 'unit' },
    { name: 'celery stalks', quantity: 2, unit: 'unit' },
    { name: 'medium carrot', quantity: 1, unit: 'unit' },
    { name: 'dry white wine', quantity: 150, unit: 'ml' },
    { name: 'whole milk', quantity: 100, unit: 'ml' },
    { name: 'San Marzano tomatoes', quantity: 200, unit: 'g' },
    { name: 'unsalted butter', quantity: 30, unit: 'g' },
    { name: 'Parmigiano Reggiano', quantity: 40, unit: 'g' },
  ] as unknown as Ingredient[],
  steps: [
    new (class extends Object {
      order = { value: 1 } as unknown as StepOrder;
      instruction = {
        value:
          'Finely dice the onion, carrot, and celery into equal-sized pieces — this is your soffritto. In a heavy-bottomed pot over low heat, melt the butter and render the pancetta until the fat turns translucent. Add the soffritto and cook gently, stirring often, until completely softened and just beginning to turn golden.',
      } as unknown as StepInstruction;
      duration = { value: 15 } as unknown as Duration;
      tips = [
        'Patience here pays dividends — rushing the soffritto yields a bitter base. Low and slow is the rule.',
      ];
      hasDuration() {
        return true;
      }
    })(),
    new (class extends Object {
      order = { value: 2 } as unknown as StepOrder;
      instruction = {
        value:
          'Raise the heat to medium-high. Add the ground veal and pork in two batches, breaking the meat apart with a wooden spoon. Allow each batch to brown properly — do not stir constantly. Season lightly with salt.',
      } as unknown as StepInstruction;
      duration = { value: 10 } as unknown as Duration;
      tips = [
        'Browning creates the Maillard reaction — the deep savory base of the sauce. Avoid crowding the pot.',
      ];
      hasDuration() {
        return true;
      }
    })(),
    new (class extends Object {
      order = { value: 3 } as unknown as StepOrder;
      instruction = {
        value:
          'Pour in the white wine. Stir well, scraping any fond from the bottom of the pot. Let the wine reduce completely until the sharp alcohol smell is gone and the liquid has almost disappeared.',
      } as unknown as StepInstruction;
      duration = { value: 8 } as unknown as Duration;
      tips = [] as string[];
      hasDuration() {
        return true;
      }
    })(),
    new (class extends Object {
      order = { value: 4 } as unknown as StepOrder;
      instruction = {
        value:
          'Add the whole milk, stir, and let it absorb into the meat over medium heat until fully evaporated. Then add the crushed San Marzano tomatoes. Stir everything together, reduce the heat to the lowest simmer, and cover with the lid slightly ajar.',
      } as unknown as StepInstruction;
      duration = { value: 210 } as unknown as Duration;
      tips = [
        'The milk softens the acidity of the meat and prevents the sauce from turning sour during the long cook.',
        'Stir every 20–30 minutes. Add a ladleful of warm water if the sauce thickens too much.',
      ];
      hasDuration() {
        return true;
      }
    })(),
    new (class extends Object {
      order = { value: 5 } as unknown as StepOrder;
      instruction = {
        value:
          'Bring a large pot of heavily salted water to a rolling boil. Cook the fresh tagliatelle for 2–3 minutes, or until al dente. Reserve a full cup of starchy pasta water before draining.',
      } as unknown as StepInstruction;
      duration = { value: 3 } as unknown as Duration;
      tips = [] as string[];
      hasDuration() {
        return true;
      }
    })(),
    new (class extends Object {
      order = { value: 6 } as unknown as StepOrder;
      instruction = {
        value:
          'Add the drained tagliatelle directly into the ragù. Toss over medium heat, adding pasta water a splash at a time until the sauce coats every strand. Plate immediately and finish with freshly grated Parmigiano Reggiano.',
      } as unknown as StepInstruction;
      duration = undefined;
      tips = [
        'Tossing in the sauce — not topping it — is what makes a ragù become part of the pasta, not just sit on top.',
      ];
      hasDuration() {
        return false;
      }
    })(),
  ] as unknown as RecipeStep[],
  createdAt: new Date('2025-04-14'),
  userId: 'usr_abc123',
});
