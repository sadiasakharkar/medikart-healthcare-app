import { HttpClientModule } from '@angular/common/http';
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { AdminLayoutComponent } from './admin/layout/admin-layout'; // ✅ Import admin layout

export const appRoutes: Routes = [
  // 🌟 Default redirect
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },

  // 🔐 Regular User Authentication
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'auth/signup',
    loadComponent: () =>
      import('./auth/signup/signup').then((m) => m.SignupComponent),
  },

  // ✅ 👤 Admin Login (this must come BEFORE the /admin layout route!)
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./admin/auth/admin-login/admin-login').then(
        (m) => m.AdminLoginComponent
      ),
  },

  // ✅ 🧑‍💼 Admin Panel Layout + Routes
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/dashboard/admin-dashboard/admin-dashboard').then(
            (m) => m.AdminDashboardComponent
          ),
      },
      {
        path: 'inventory',
        loadComponent: () =>
          import('./admin/dashboard/inventory/inventory').then(
            (m) => m.InventoryComponent
          ),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./admin/dashboard/orders/orders').then(
            (m) => m.OrdersComponent
          ),
      },
      {
        path: 'returns',
        loadComponent: () =>
          import('./admin/dashboard/returns/returns').then(
            (m) => m.ReturnsComponent
          ),
      },
    ],
  },

  // ✅ 🏠 Regular User Dashboard Layout + Routes
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    children: [
      {
        path: 'overview',
        loadComponent: () =>
          import('./dashboard/overview/overview').then(
            (m) => m.MainContentComponent
          ),
      },
      {
        path: 'health-home',
        loadComponent: () =>
          import('./dashboard/health-home/health-home').then(
            (m) => m.HealthHome
          ),
      },
      {
        path: 'my-orders',
        loadComponent: () =>
          import('./dashboard/my-orders/my-orders').then(
            (m) => m.MyOrdersComponent
          ),
      },
      {
        path: 'prescriptions',
        loadComponent: () =>
          import('./dashboard/prescriptions/prescriptions').then(
            (m) => m.PrescriptionsComponent
          ),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./dashboard/wishlist/wishlist').then(
            (m) => m.WishlistComponent
          ),
      },
      {
        path: 'addresses',
        loadComponent: () =>
          import('./dashboard/addresses/addresses').then(
            (m) => m.AddressesComponent
          ),
      },
      {
        path: 'shopping-cart',
        loadComponent: () =>
          import('./dashboard/shopping-cart/shopping-cart').then(
            (m) => m.ShoppingCartComponent
          ),
      },
      {
        path: 'payment-method',
        loadComponent: () =>
          import('./dashboard/payment-method/payment-method').then(
            (m) => m.PaymentMethodComponent
          ),
      },
      {
        path: 'account-settings',
        loadComponent: () =>
          import('./dashboard/account-settings/account-settings').then(
            (m) => m.AccountSettingsComponent
          ),
      },
      {
        path: 'support',
        loadComponent: () =>
          import('./dashboard/support/support').then((m) => m.SupportComponent),
      },
    ],
  },

  // 🧭 Wildcard redirect
  {
    path: '**',
    redirectTo: 'dashboard/overview',
  },
];
