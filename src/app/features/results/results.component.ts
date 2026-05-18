import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RecipeCardComponent } from '../../shared/ui/recipe-card/recipe-card.component';
import { selectRequestedRecipes } from '../../store/selectors/recipes.selector';

@Component({
  selector: 'app-results',
  imports: [RecipeCardComponent, AsyncPipe],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss',
})
export class ResultsComponent {
  public recipes$ = this.store.select(selectRequestedRecipes);
  constructor(
    private store: Store,
    private router: Router,
  ) {}
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
    //     {
    //       name: new IngredientName('Spaghetti'),
    //       quantity: new Quantity(200),
    //       unit: new Unit('G'),
    //     },
    //     {
    //       name: new IngredientName('Guanciale'),
    //       quantity: new Quantity(100),
    //       unit: new Unit('G'),
    //     },
    //     {
    //       name: new IngredientName('Egg yolks'),
    //       quantity: new Quantity(4),
    //       unit: new Unit('G'),
    //     },
    //     {
    //       name: new IngredientName('Pecorino Romano'),
    //       quantity: new Quantity(60),
    //       unit: new Unit('G'),
    //     },
    //     {
    //       name: new IngredientName('Black pepper'),
    //       quantity: new Quantity(1),
    //       unit: new Unit('TSP'),
    //     },
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
    //     {
    //       name: new IngredientName('Roma tomatoes'),
    //       quantity: new Quantity(900),
    //       unit: new Unit('G'),
    //     },
    //     {
    //       name: new IngredientName('Heavy cream'),
    //       quantity: new Quantity(120),
    //       unit: new Unit('ML'),
    //     },
    //     {
    //       name: new IngredientName('Garlic cloves'),
    //       quantity: new Quantity(5),
    //       unit: new Unit('G'),
    //     },
    //     {
    //       name: new IngredientName('Fresh basil'),
    //       quantity: new Quantity(15),
    //       unit: new Unit('G'),
    //     },
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
    //     {
    //       name: new IngredientName('Dry-aged ribeye'),
    //       quantity: new Quantity(600),
    //       unit: new Unit('G'),
    //     },
    //     {
    //       name: new IngredientName('Unsalted butter'),
    //       quantity: new Quantity(60),
    //       unit: new Unit('G'),
    //     },
    //     {
    //       name: new IngredientName('Rosemary sprigs'),
    //       quantity: new Quantity(3),
    //       unit: new Unit('G'),
    //     },
    //     {
    //       name: new IngredientName('Garlic cloves'),
    //       quantity: new Quantity(4),
    //       unit: new Unit('G'),
    //     },
    //     {
    //       name: new IngredientName('Flaky sea salt'),
    //       quantity: new Quantity(2),
    //       unit: new Unit('TSP'),
    //     },
    //     {
    //       name: new IngredientName('Cracked pepper'),
    //       quantity: new Quantity(1),
    //       unit: new Unit('TSP'),
    //     },
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
    //     {
    //       name: new IngredientName('Spaghetti'),
    //       quantity: new Quantity(200),
    //       unit: new Unit('G'),
    //     },
    //     {
    //       name: new IngredientName('Guanciale'),
    //       quantity: new Quantity(100),
    //       unit: new Unit('G'),
    //     },
    //     {
    //       name: new IngredientName('Egg yolks'),
    //       quantity: new Quantity(4),
    //       unit: new Unit('G'),
    //     },
    //     {
    //       name: new IngredientName('Pecorino Romano'),
    //       quantity: new Quantity(60),
    //       unit: new Unit('G'),
    //     },
    //     {
    //       name: new IngredientName('Black pepper'),
    //       quantity: new Quantity(1),
    //       unit: new Unit('TSP'),
    //     },
    //   ],
    //   createdAt: new Date('2024-03-15'),
    // },
  ];
}
