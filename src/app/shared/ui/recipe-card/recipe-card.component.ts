import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Recipe } from '../../../core/domain/models/recipe/recipe.model';

@Component({
  selector: 'app-recipe-card',
  imports: [CommonModule],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.scss',
})
export class RecipeCardComponent {
  @Input({ required: true }) recipe!: Recipe;

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
}
