import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model'; 
import { CartItem } from '../../models/cart.model';

// Add to Cart
export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product; quantity?: number }>()
);

export const addToCartSuccess = createAction(
  '[Cart] Add To Cart Success',
  props<{ product: Product; quantity?: number }>()
);

// Remove from Cart
export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number }>()
);

export const removeFromCartSuccess = createAction(
  '[Cart] Remove From Cart Success',
  props<{ productId: number }>() 
);

// Update Quantity 
export const updateCartQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; quantity: number }>()
);

export const updateCartQuantitySuccess = createAction(
  '[Cart] Update Quantity Success',
  props<{ productId: number; quantity: number }>() 
);

// Clear Cart
export const clearCart = createAction(
  '[Cart] Clear Cart'
);

export const clearCartSuccess = createAction(
  '[Cart] Clear Cart Success'
);

// Load Cart from Storage
export const loadCartFromStorage = createAction(
  '[Cart] Load From Storage'
);

export const loadCartFromStorageSuccess = createAction(
  '[Cart] Load From Storage Success',
  props<{ cart: { items: CartItem[]; total: number; itemCount: number } }>()
);