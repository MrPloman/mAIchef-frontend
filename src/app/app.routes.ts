import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { HomeComponent } from './features/home/home.component';
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail.component';
import { ResultsComponent } from './features/results/results.component';
import {
  recipeDetailGuard,
  recipesRequestedGuard,
} from './shared/guards/recipe.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'results',
    component: ResultsComponent,
    canActivate: [recipesRequestedGuard],
  },
  { path: 'profile', component: AuthComponent },
  {
    path: 'recipe/:id',
    component: RecipeDetailComponent,
    canActivate: [recipeDetailGuard],
  },
  { path: '**', redirectTo: '/home' }, // Wildcard must be last
];
