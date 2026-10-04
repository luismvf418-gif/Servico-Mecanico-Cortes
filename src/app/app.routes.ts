import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () =>
      import('./welcome/welcome.page').then((m) => m.WelcomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./services/services.page').then((m) => m.ServicesPage),
  },
  {
    path: 'service-detail/:id', // <--- AQUÍ AGREGAMOS /:id
    loadComponent: () =>
      import('./service-detail/service-detail.page').then(
        (m) => m.ServiceDetailPage
      ),
  },
];