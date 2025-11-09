import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CheckoutState } from '../models/checkout-state.model';

export const selectCheckoutState = createFeatureSelector<CheckoutState>('checkout');

export const selectShippingAddress = createSelector(
  selectCheckoutState,
  (state) => state.shippingAddress
);

export const selectBillingAddress = createSelector(
  selectCheckoutState,
  (state) => state.billingAddress
);

export const selectPaymentMethod = createSelector(
  selectCheckoutState,
  (state) => state.paymentMethod
);

export const selectCurrentOrder = createSelector(
  selectCheckoutState,
  (state) => state.currentOrder
);

export const selectCheckoutLoading = createSelector(
  selectCheckoutState,
  (state) => state.loading
);

export const selectCheckoutError = createSelector(
  selectCheckoutState,
  (state) => state.error
);

export const selectCheckoutStepValidity = createSelector(
  selectShippingAddress,
  selectBillingAddress,
  selectPaymentMethod,
  (shipping, billing, payment) => ({
    shippingValid: !!shipping,
    billingValid: !!billing,
    paymentValid: !!payment
  })
);

export const selectIsCheckoutComplete = createSelector(
  selectCheckoutStepValidity,
  (validity) => validity.shippingValid && validity.billingValid && validity.paymentValid
);