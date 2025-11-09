import { createReducer, on } from '@ngrx/store';
import { CartState } from '../models/app-state.model';
import * as CartActions from '../actions/cart.actions';
import { CartItem } from '../../models/cart.model'; 

export const initialCartState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
};

// Helper functions
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

const calculateItemCount = (items: CartItem[]): number => {
  return items.reduce((count, item) => count + item.quantity, 0);
};

const updateCartState = (items: CartItem[]): CartState => {
  return {
    items,
    total: calculateTotal(items),
    itemCount: calculateItemCount(items)
  };
};

export const cartReducer = createReducer(
  initialCartState,

  // Add to Cart
  on(CartActions.addToCartSuccess, (state, { product, quantity = 1 }) => {
    const existingItem = state.items.find(item => item.product.id === product.id);
    let newItems: CartItem[];

    if (existingItem) {
      newItems = state.items.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...state.items, { product, quantity }];
    }

    return updateCartState(newItems);
  }),

  // Remove from Cart
  on(CartActions.removeFromCartSuccess, (state, { productId }) => {
    const newItems = state.items.filter(item => item.product.id !== productId);
    return updateCartState(newItems);
  }),

  // Update Quantity
  on(CartActions.updateCartQuantitySuccess, (state, { productId, quantity }) => {
    if (quantity <= 0) {
      const newItems = state.items.filter(item => item.product.id !== productId);
      return updateCartState(newItems);
    }

    const newItems = state.items.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    
    return updateCartState(newItems);
  }),

  // Clear Cart
  on(CartActions.clearCartSuccess, () => updateCartState([])),

  // Load from Storage
  on(CartActions.loadCartFromStorageSuccess, (state, { cart }) => ({
    ...state,
    ...cart
  }))
);