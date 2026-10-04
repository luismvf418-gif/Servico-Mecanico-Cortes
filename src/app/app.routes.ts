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
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.page').then((m) => m.CartPage),
  },
  {
    path: 'appointments',
    loadComponent: () =>
      import('./appointments/appointments.page').then(
        (m) => m.AppointmentsPage
      ),
  },
  {
    path: 'add-vehicle',
    loadComponent: () =>
      import('./add-vehicle/add-vehicle.page').then((m) => m.AddVehiclePage),
  },
  {
    path: 'vehicles',
    loadComponent: () =>
      import('./vehicles/vehicles.page').then((m) => m.VehiclesPage),
  },
  {
    path: 'select-vehicle',
    loadComponent: () =>
      import('./select-vehicle/select-vehicle.page').then(
        (m) => m.SelectVehiclePage
      ),
  },
  {
    path: 'payment-method',
    loadComponent: () =>
      import('./payment-method/payment-method.page').then(
        (m) => m.PaymentMethodPage
      ),
  },
  {
    path: 'appointment-summary',
    loadComponent: () =>
      import('./appointment-summary/appointment-summary.page').then(
        (m) => m.AppointmentSummaryPage
      ),
  },
  {
    path: 'appointments-list',
    loadComponent: () =>
      import('./appointments-list/appointments-list.page').then(
        (m) => m.AppointmentsListPage
      ),
  },
  {
    path: 'appointment-detail',
    loadComponent: () =>
      import('./appointment-detail/appointment-detail.page').then(
        (m) => m.AppointmentDetailPage
      ),
  },
];
