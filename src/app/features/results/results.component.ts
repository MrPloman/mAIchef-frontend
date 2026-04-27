import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipeCardComponent } from '../../shared/ui/recipe-card/recipe-card.component';
import { selectRequestedRecipes } from '../../store/selectors/recipes.selector';

@Component({
  selector: 'app-results',
  imports: [RecipeCardComponent],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent {
  private recipes$ = this.store.select(selectRequestedRecipes);
  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.recipes$.subscribe((recipes) => {
      if (recipes.length > 0) {
        this.recipes = recipes;
      } else {
        this.router.navigate(['/']);
      }
    });
  }
  recipes: any[] = [
    // {
    //   _id: '1',
    //   title: 'Spaghetti Carbonara',
    //   description:
    //     'A silky Roman classic made with eggs, pecorino, guanciale, and black pepper — no cream needed.',
    //   difficulty: new Difficulty('medium'),
    //   estimatedTimeInMinutes: 25,
    //   servings: 2,
    //   ingredients: [
    //     { name: 'Spaghetti', quantity: 200, unit: 'g' },
    //     { name: 'Guanciale', quantity: 100, unit: 'g' },
    //     { name: 'Egg yolks', quantity: 4, unit: '' },
    //     { name: 'Pecorino Romano', quantity: 60, unit: 'g' },
    //     { name: 'Black pepper', quantity: 1, unit: 'tsp' },
    //   ],
    //   createdAt: new Date('2024-03-15'),
    // },
    // {
    //   _id: '2',
    //   title: 'Roasted Tomato Bisque',
    //   description:
    //     'Deeply caramelized tomatoes blended with cream and fresh basil for a bowl of pure comfort.',
    //   difficulty: new Difficulty('easy'),
    //   estimatedTimeInMinutes: 45,
    //   servings: 4,
    //   ingredients: [
    //     { name: 'Roma tomatoes', quantity: 900, unit: 'g' },
    //     { name: 'Heavy cream', quantity: 120, unit: 'ml' },
    //     { name: 'Garlic cloves', quantity: 5, unit: '' },
    //     { name: 'Fresh basil', quantity: 15, unit: 'g' },
    //   ],
    //   createdAt: new Date('2024-04-02'),
    // },
    // {
    //   _id: '3',
    //   title: 'Dry-Aged Ribeye',
    //   description:
    //     'A perfectly seared dry-aged ribeye with herb butter, rested to juicy perfection.',
    //   difficulty: new Difficulty('hard'),
    //   estimatedTimeInMinutes: 90,
    //   servings: 2,
    //   ingredients: [
    //     { name: 'Dry-aged ribeye', quantity: 600, unit: 'g' },
    //     { name: 'Unsalted butter', quantity: 60, unit: 'g' },
    //     { name: 'Rosemary sprigs', quantity: 3, unit: '' },
    //     { name: 'Garlic cloves', quantity: 4, unit: '' },
    //     { name: 'Flaky sea salt', quantity: 2, unit: 'tsp' },
    //     { name: 'Cracked pepper', quantity: 1, unit: 'tbsp' },
    //   ],
    //   createdAt: new Date('2024-05-10'),
    // },
    // {
    //   _id: '4',
    //   title: 'Spaghetti Carbonara',
    //   description:
    //     'A silky Roman classic made with eggs, pecorino, guanciale, and black pepper — no cream needed.',
    //   difficulty: new Difficulty('medium'),
    //   estimatedTimeInMinutes: 25,
    //   servings: 2,
    //   ingredients: [
    //     { name: 'Spaghetti', quantity: 200, unit: 'g' },
    //     { name: 'Guanciale', quantity: 100, unit: 'g' },
    //     { name: 'Egg yolks', quantity: 4, unit: '' },
    //     { name: 'Pecorino Romano', quantity: 60, unit: 'g' },
    //     { name: 'Black pepper', quantity: 1, unit: 'tsp' },
    //   ],
    //   createdAt: new Date('2024-03-15'),
    // },
  ];
}
