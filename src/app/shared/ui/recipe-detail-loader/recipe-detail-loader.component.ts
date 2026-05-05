import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe-detail-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail-loader.component.html',
  styleUrl: './recipe-detail-loader.component.scss',
})
export class RecipeDetailLoaderComponent {
  readonly ingredientRows = Array(6);
  readonly stepRows = [
    { lines: 3, hasDuration: true, hasTip: true },
    { lines: 2, hasDuration: true, hasTip: false },
    { lines: 2, hasDuration: false, hasTip: false },
  ];
}
