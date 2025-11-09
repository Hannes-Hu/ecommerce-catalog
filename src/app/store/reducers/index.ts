import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../models/app-state.model';
import { productsReducer } from './products.reducer';
import { cartReducer } from './cart.reducer';
import { filterReducer } from './filter.reducer';
import { authReducer } from './auth.reducer'; 
import { checkoutReducer } from './checkout.reducer';

export const reducers: ActionReducerMap<AppState> = {
  products: productsReducer,
  cart: cartReducer,
  filters: filterReducer,
  auth: authReducer, 
  checkout: checkoutReducer,
  ui: (state: any) => state // Placeholder for UI state
};