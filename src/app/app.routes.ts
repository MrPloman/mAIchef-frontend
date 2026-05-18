import { Routes } from '@angular/router';
import { listsPageGuard } from './shared/guards/lists.guard';
import {
  recipeDetailGuard,
  recipesRequestedGuard,
} from './shared/guards/recipe.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'lists',
    loadComponent: () =>
      import('./features/lists/lists.component').then((m) => m.ListsComponent),
    canActivate: [listsPageGuard],
  },
  {
    path: 'results',
    loadComponent: () =>
      import('./features/results/results.component').then(
        (m) => m.ResultsComponent,
      ),
    canActivate: [recipesRequestedGuard],
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'recipe/:id',
    loadComponent: () =>
      import('./features/recipe-detail/recipe-detail.component').then(
        (m) => m.RecipeDetailComponent,
      ),
    canActivate: [recipeDetailGuard],
  },
  { path: '**', redirectTo: '/home' }, // Wildcard must be last
];
