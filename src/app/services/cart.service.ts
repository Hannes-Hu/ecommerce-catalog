import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartKey = 'ecommerce-cart';
  private cartSubject = new BehaviorSubject<Cart>(this.getInitialCart());
  public cart$ = this.cartSubject.asObservable();

  constructor() {}

  private getInitialCart(): Cart {
    const savedCart = localStorage.getItem(this.cartKey);
    if (savedCart) {
      return JSON.parse(savedCart);
    }
    return { items: [], total: 0, itemCount: 0 };
  }

  // Add product to cart
  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.items.find(item => item.product.id === product.id);

    let newItems: CartItem[];
    
    if (existingItem) {
      newItems = currentCart.items.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...currentCart.items, { product, quantity }];
    }

    this.updateCart(newItems);
  }

  // Remove product from cart
  removeFromCart(productId: number): void {
    const currentCart = this.cartSubject.value;
    const newItems = currentCart.items.filter(item => item.product.id !== productId);
    this.updateCart(newItems);
  }

  // Update product quantity
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentCart = this.cartSubject.value;
    const newItems = currentCart.items.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    
    this.updateCart(newItems);
  }

  // Clear entire cart
  clearCart(): void {
    this.updateCart([]);
  }

  // Get current cart state
  getCart(): Cart {
    return this.cartSubject.value;
  }

  // Check if product is in cart
  isInCart(productId: number): boolean {
    return this.cartSubject.value.items.some(item => item.product.id === productId);
  }

  // Get quantity of specific product in cart
  getProductQuantity(productId: number): number {
    const item = this.cartSubject.value.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  }

  // Update cart and persist to localStorage
  private updateCart(items: CartItem[]): void {
    const total = this.calculateTotal(items);
    const itemCount = this.calculateItemCount(items);
    
    const newCart: Cart = { items, total, itemCount };
    
    this.cartSubject.next(newCart);
    localStorage.setItem(this.cartKey, JSON.stringify(newCart));
  }

  private calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  private calculateItemCount(items: CartItem[]): number {
    return items.reduce((count, item) => count + item.quantity, 0);
  }
}