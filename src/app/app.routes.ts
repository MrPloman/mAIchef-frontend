import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { HomeComponent } from './features/home/home.component';
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail.component';
import { ResultsComponent } from './features/results/results.component';
import { recipeGuard } from './shared/guards/recipe.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'profile', component: AuthComponent },
  {
    path: 'recipe/:id',
    component: RecipeDetailComponent,
    canActivate: [recipeGuard],
  }, // Add auth guard here
  { path: '**', redirectTo: '/home' }, // Wildcard must be last
];
