export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface BillingAddress {
  sameAsShipping: boolean;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  type: 'credit-card' | 'paypal' | 'stripe';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  nameOnCard?: string;
}

export interface OrderSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  discount?: number;
}

export interface Order {
  id: string;
  userId: number;
  items: any[]; // Cart items
  shippingAddress: ShippingAddress;
  billingAddress: BillingAddress;
  paymentMethod: PaymentMethod;
  orderSummary: OrderSummary;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
}