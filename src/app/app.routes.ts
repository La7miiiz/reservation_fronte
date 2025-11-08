import { Routes } from '@angular/router';
import { provideHttpClient, withRequestsMadeViaParent } from '@angular/common/http';
import { AuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login').then(m => m.LoginComponent),
    providers: [
      provideHttpClient(withRequestsMadeViaParent()),
    ]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register/register').then(m => m.RegisterComponent)
  },
  {
  path: 'profile',
  canActivate: [AuthGuard], // protect with your guard
  loadComponent: () => import('./pages/profile/profile').then(m => m.ProfileComponent)
  },

  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'rooms',
    canActivate: [AuthGuard],
    loadComponent: () =>import('./pages/rooms-list/rooms-list').then(m => m.RoomsListComponent),
    // Add canActivate: [AuthGuard] if protection is needed
  },
   {
    path: 'reservations', // or 'reservation' if you prefer
    canActivate: [AuthGuard], // Only if you want the route protected
    loadComponent: () => import('./pages/reservations/reservations').then(m => m.ReservationsComponent)
  },
  {
  path: 'history',
  canActivate: [AuthGuard], // if you want it protected
  loadComponent: () => import('./pages/reservation-history/reservation-history').then(m => m.ReservationHistoryComponent)
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
