import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import * as CartActions from '../actions/cart.actions';
import { AppState } from '../models/app-state.model';
import { selectCartState } from '../selectors/products.selectors';

@Injectable()
export class CartEffects {

  // Handle add to cart
  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      map(({ product, quantity = 1 }) => 
        CartActions.addToCartSuccess({ product, quantity })
      )
    )
  );

  // Handle remove from cart
  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeFromCart),
      map(({ productId }) => 
        CartActions.removeFromCartSuccess({ productId })
      )
    )
  );

  // Handle quantity update
  updateQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateCartQuantity),
      map(({ productId, quantity }) => 
        CartActions.updateCartQuantitySuccess({ productId, quantity })
      )
    )
  );

  // Handle clear cart
  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      map(() => CartActions.clearCartSuccess())
    )
  );

  // Persist cart to localStorage on any cart change
  persistCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CartActions.addToCartSuccess,
        CartActions.removeFromCartSuccess,
        CartActions.updateCartQuantitySuccess,
        CartActions.clearCartSuccess
      ),
      withLatestFrom(this.store.select(selectCartState)),
      tap(([action, cartState]) => {
        localStorage.setItem('ecommerce-cart', JSON.stringify(cartState));
      })
    ),
    { dispatch: false }
  );

  // Load cart from localStorage on app start
  loadCartFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCartFromStorage),
      map(() => {
        const savedCart = localStorage.getItem('ecommerce-cart');
        
        if (savedCart) {
          const cart = JSON.parse(savedCart);
          return CartActions.loadCartFromStorageSuccess({ cart });
        }
        
        return CartActions.loadCartFromStorageSuccess({ 
          cart: { items: [], total: 0, itemCount: 0 } 
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}
}