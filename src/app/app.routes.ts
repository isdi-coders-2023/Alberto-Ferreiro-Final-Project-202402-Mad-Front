import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'landing',
    title: 'Umbrella: Landing',
    loadComponent: () => import('./components/landing/landing.component'),
  },
  {
    path: 'user-login',
    title: 'Umbrella: Login',
    loadComponent: () => import('./components/login/login.component'),
  },
  {
    path: 'user-register',
    title: 'Umbrella: Registro',
    loadComponent: () => import('./components/register/register.component'),
  },
  {
    path: 'error-page',
    title: 'Umbrella: Error',
    loadComponent: () => import('./components/error/error.component'),
  },
  {
    path: 'create-policy/:policyName',
    title: 'Umbrella: Nueva Póliza',
    loadComponent: () =>
      import('./components/policy-create/policy-create.component'),
  },
  {
    path: 'create-policy',
    title: 'Umbrella: Nueva Póliza',
    loadComponent: () =>
      import('./components/policy-create/policy-create.component'),
  },
  {
    path: 'logout',
    title: 'Umbrella: Logout',
    loadComponent: () => import('./components/logout/logout.component'),
  },
  {
    path: 'home',
    title: 'Umbrella: Logout',
    loadComponent: () => import('./components/home/home.component'),
  },
  {
    path: 'view-policy/:id',
    title: 'Policy Detail',
    loadComponent: () =>
      import('./components/view-policy/view-policy.component'),
  },
  {
    path: 'edit-policy/:id',
    title: 'Policy Update',
    loadComponent: () =>
      import('./components/edit-policy/edit-policy.component'),
  },
  {
    path: 'edit-user/:id',
    title: 'User Update',
    loadComponent: () => import('./components/edit-user/edit-user.component'),
  },
  {
    path: 'claims/:policyId',
    title: 'Policy Claims',
    loadComponent: () => import('./components/claim-list/claim-list.component'),
  },

  {
    path: 'create-claim/:policyId/:claimType',
    title: 'New Claim',
    loadComponent: () =>
      import('./components/create-claim/create-claim.component'),
  },

  { path: '', pathMatch: 'full', redirectTo: 'landing' },
  { path: '**', redirectTo: 'error-page' },
];
