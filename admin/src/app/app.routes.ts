import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component'
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {authGuard} from './auth/auth.guard';
import {guestGuard} from './auth/guest.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    title: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'dashboard',
    title: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  }
];
