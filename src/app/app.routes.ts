import { Routes } from '@angular/router';
import { provideHttpClient, withRequestsMadeViaParent } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login').then(m => m.LoginComponent),
    providers: [
      provideHttpClient(withRequestsMadeViaParent()),
      // You may add interceptors here if you don't provide them globally
      // withInterceptors([AuthInterceptor]),
    ]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register/register').then(m => m.RegisterComponent)
    // No need for providers here unless you want to customize http client/interceptors
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
