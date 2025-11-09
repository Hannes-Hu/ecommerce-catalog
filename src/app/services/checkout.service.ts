import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Order, ShippingAddress, BillingAddress, PaymentMethod, OrderSummary } from '../models/checkout.model';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private ordersKey = 'ecommerce-orders';

  constructor(private http: HttpClient) {}

  // Mock order placement - in real app, this would call the backend API
  placeOrder(
    cart: Cart,
    shippingAddress: ShippingAddress,
    billingAddress: BillingAddress,
    paymentMethod: PaymentMethod
  ): Observable<Order> {
    return of(this.mockPlaceOrder(cart, shippingAddress, billingAddress, paymentMethod)).pipe(
      delay(1500) // Simulate API call
    );
  }

  private mockPlaceOrder(
    cart: Cart,
    shippingAddress: ShippingAddress,
    billingAddress: BillingAddress,
    paymentMethod: PaymentMethod
  ): Order {
    const orderSummary: OrderSummary = {
      subtotal: cart.total,
      shipping: 0, 
      tax: cart.total * 0.08,
      total: cart.total * 1.08
    };

    const order: Order = {
      id: 'ORD-' + Date.now(),
      userId: 1, // In real app, get from auth
      items: cart.items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      orderSummary,
      status: 'confirmed',
      orderDate: new Date(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
    };

    // Save order to localStorage
    this.saveOrderToStorage(order);

    return order;
  }

  private saveOrderToStorage(order: Order): void {
    const orders = this.getStoredOrders();
    orders.push(order);
    localStorage.setItem(this.ordersKey, JSON.stringify(orders));
  }

  private getStoredOrders(): Order[] {
    const ordersStr = localStorage.getItem(this.ordersKey);
    return ordersStr ? JSON.parse(ordersStr) : [];
  }

  getOrder(orderId: string): Order | null {
    const orders = this.getStoredOrders();
    return orders.find(order => order.id === orderId) || null;
  }

  getUserOrders(userId: number): Order[] {
    const orders = this.getStoredOrders();
    return orders.filter(order => order.userId === userId);
  }
}