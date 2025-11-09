import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as CheckoutActions from '../actions/checkout.actions';
import * as CartActions from '../actions/cart.actions';
import { CheckoutService } from '../../services/checkout.service';
import { AppState } from '../models/app-state.model';
import * as CheckoutSelectors from '../selectors/checkout.selectors';
import * as CartSelectors from '../selectors/products.selectors';

@Injectable()
export class CheckoutEffects {
  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.placeOrder),
      withLatestFrom(
        this.store.select(CartSelectors.selectCartState),
        this.store.select(CheckoutSelectors.selectShippingAddress),
        this.store.select(CheckoutSelectors.selectBillingAddress),
        this.store.select(CheckoutSelectors.selectPaymentMethod)
      ),
      mergeMap(([action, cart, shipping, billing, payment]) => {
        if (!shipping || !billing || !payment) {
          return of(CheckoutActions.placeOrderFailure({ 
            error: 'Missing required checkout information' 
          }));
        }

        return this.checkoutService.placeOrder(cart, shipping, billing, payment).pipe(
          map(order => {
            // Clear cart on successful order
            this.store.dispatch(CartActions.clearCart());
            return CheckoutActions.placeOrderSuccess({ order });
          }),
          catchError(error => of(CheckoutActions.placeOrderFailure({ error: error.message })))
        );
      })
    )
  );

  // Redirect on successful order
  orderSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CheckoutActions.placeOrderSuccess),
      tap(({ order }) => {
        // Navigate to order confirmation page
        this.router.navigate(['/order-confirmation', order.id]);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private checkoutService: CheckoutService,
    private store: Store<AppState>,
    private router: Router
  ) {}
}