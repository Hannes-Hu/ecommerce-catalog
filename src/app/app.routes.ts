import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

// Import admin components
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'category/:category', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: UserAccountComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  
  // Admin Routes
  { 
    path: 'admin/dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AdminGuard] 
  },
  { 
    path: 'admin/products', 
    component: AdminProductsComponent, 
    canActivate: [AdminGuard] 
  },
  { 
    path: 'admin/orders', 
    component: AdminOrdersComponent, 
    canActivate: [AdminGuard] 
  },
  { 
    path: 'admin/users', 
    component: AdminUsersComponent, 
    canActivate: [AdminGuard] 
  },
  { 
    path: 'admin', 
    redirectTo: 'admin/dashboard', 
    pathMatch: 'full' 
  },
  
  { path: '**', redirectTo: '' }
];