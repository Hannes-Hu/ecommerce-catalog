import { ShippingAddress, BillingAddress, PaymentMethod, Order } from '../../models/checkout.model';

export interface CheckoutState {
  shippingAddress: ShippingAddress | null;
  billingAddress: BillingAddress | null;
  paymentMethod: PaymentMethod | null;
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
}

export const initialCheckoutState: CheckoutState = {
  shippingAddress: null,
  billingAddress: null,
  paymentMethod: null,
  currentOrder: null,
  loading: false,
  error: null
};