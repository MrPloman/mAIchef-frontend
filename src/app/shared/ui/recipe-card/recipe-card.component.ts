import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../../core/domain/models/recipe/recipe.model';
import { AuthFacade } from '../../../store/facades/auth.facade';
import { RecipesFacade } from '../../../store/facades/recipes.facade';

@Component({
  selector: 'app-recipe-card',
  imports: [CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe!: Recipe;
  public isAuthenticated$ = this.authFacade.isAuthenticated$;
  constructor(
    private recipesFacade: RecipesFacade,
    private authFacade: AuthFacade,
    private router: Router,
  ) {}
  get formattedTime(): string {
    const h = Math.floor(this.recipe.estimatedTimeInMinutes / 60);
    const m = this.recipe.estimatedTimeInMinutes % 60;
    if (h === 0) return `${m}min`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}min`;
  }

  get visibleIngredients() {
    return this.recipe.ingredients.slice(0, 4);
  }

  get remainingIngredients(): number {
    return Math.max(0, this.recipe.ingredients.length - 4);
  }
  toggleLike() {}

  public viewRecipe() {
    this.recipesFacade.setRecipeSelected(this.recipe._id);

    this.router.navigate(['/recipe', this.recipe._id]);
  }
}
