import { Routes } from '@angular/router';
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
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },
      {
        path: 'reset',
        loadComponent: () =>
          import('./reset/reset.component').then((m) => m.ResetComponent),
      },
      {
        path: 'recovery',
        loadComponent: () =>
          import('./recovery/recovery.component').then(
            (m) => m.RecoveryComponent,
          ),
      },
    ],
  },
];
