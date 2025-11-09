import { createAction, props } from '@ngrx/store';
import { ShippingAddress, BillingAddress, PaymentMethod, Order } from '../../models/checkout.model';

// Shipping Address
export const updateShippingAddress = createAction(
  '[Checkout] Update Shipping Address',
  props<{ shippingAddress: ShippingAddress }>()
);

// Billing Address
export const updateBillingAddress = createAction(
  '[Checkout] Update Billing Address',
  props<{ billingAddress: BillingAddress }>()
);

export const setBillingSameAsShipping = createAction(
  '[Checkout] Set Billing Same As Shipping',
  props<{ sameAsShipping: boolean }>()
);

// Payment Method
export const updatePaymentMethod = createAction(
  '[Checkout] Update Payment Method',
  props<{ paymentMethod: PaymentMethod }>()
);

// Place Order
export const placeOrder = createAction(
  '[Checkout] Place Order'
);

export const placeOrderSuccess = createAction(
  '[Checkout] Place Order Success',
  props<{ order: Order }>()
);

export const placeOrderFailure = createAction(
  '[Checkout] Place Order Failure',
  props<{ error: string }>()
);

// Clear Checkout
export const clearCheckout = createAction(
  '[Checkout] Clear Checkout'
);

// Load Checkout from Storage
export const loadCheckoutFromStorage = createAction(
  '[Checkout] Load From Storage'
);