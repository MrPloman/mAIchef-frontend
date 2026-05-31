import { Routes } from '@angular/router';
import {
  isAuthenticatedGuard,
  isNotAuthenticatedGuard,
} from '../../shared/guards/auth.guard';
import { AuthComponent } from './auth.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent, // The layout component
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.component').then((m) => m.LoginComponent),
        canActivate: [isNotAuthenticatedGuard],
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./register/register.component').then(
            (m) => m.RegisterComponent,
          ),
        canActivate: [isNotAuthenticatedGuard],
      },
      {
        path: 'reset',
        loadComponent: () =>
          import('./reset/reset.component').then((m) => m.ResetComponent),
        canActivate: [],
      },
      {
        path: 'recovery',
        loadComponent: () =>
          import('./recovery/recovery.component').then(
            (m) => m.RecoveryComponent,
          ),
      },
      {
        path: '',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () =>
          import('./auth.component').then((m) => m.AuthComponent),
      },
    ],
  },
];
