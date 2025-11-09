import { createReducer, on } from '@ngrx/store';
import { CheckoutState, initialCheckoutState } from '../models/checkout-state.model';
import * as CheckoutActions from '../actions/checkout.actions';

export const checkoutReducer = createReducer(
  initialCheckoutState,

  // Update Shipping Address
  on(CheckoutActions.updateShippingAddress, (state, { shippingAddress }) => ({
    ...state,
    shippingAddress,
    error: null
  })),

  // Update Billing Address
  on(CheckoutActions.updateBillingAddress, (state, { billingAddress }) => ({
    ...state,
    billingAddress,
    error: null
  })),

  // Set Billing Same as Shipping
  on(CheckoutActions.setBillingSameAsShipping, (state, { sameAsShipping }) => ({
    ...state,
    billingAddress: state.billingAddress ? {
      ...state.billingAddress,
      sameAsShipping
    } : null,
    error: null
  })),

  // Update Payment Method
  on(CheckoutActions.updatePaymentMethod, (state, { paymentMethod }) => ({
    ...state,
    paymentMethod,
    error: null
  })),

  // Place Order
  on(CheckoutActions.placeOrder, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CheckoutActions.placeOrderSuccess, (state, { order }) => ({
    ...state,
    currentOrder: order,
    loading: false,
    error: null
  })),

  on(CheckoutActions.placeOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Clear Checkout
  on(CheckoutActions.clearCheckout, () => initialCheckoutState)
);