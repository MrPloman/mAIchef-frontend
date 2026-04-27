import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component/auth.component';
import { HomeComponent } from './features/home/home.component';
import { ResultsComponent } from './features/results/results.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'profile', component: AuthComponent },
];
