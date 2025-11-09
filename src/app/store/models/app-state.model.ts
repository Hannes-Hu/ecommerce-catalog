import { Product } from '../../models/product.model';
import { Cart, CartItem } from '../../models/cart.model'; 
import { ProductFilter } from '../../models/filter.model'; 
import { AuthState } from '../../models/auth.model'; 
import { CheckoutState } from './checkout-state.model';

// Products State
export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  categories: string[];
}

// Cart State
export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// UI State
export interface UIState {
  loading: boolean;
  notifications: Notification[];
}

// Filter State
export interface FilterState {
  filters: ProductFilter;
  availableCategories: string[];
}

// App Global State
export interface AppState {
  products: ProductsState;
  cart: CartState;
  ui: UIState;
  filters: FilterState;
  auth: AuthState; 
  checkout: CheckoutState;
}