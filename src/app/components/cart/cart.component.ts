import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartItem } from '../../models/cart.model';

// NgRx imports
import * as CartActions from '../../store/actions/cart.actions';
import * as CartSelectors from '../../store/selectors/products.selectors';
import { AppState } from '../../store/models/app-state.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  cartItemCount$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
    this.cartTotal$ = this.store.select(CartSelectors.selectCartTotal);
    this.cartItemCount$ = this.store.select(CartSelectors.selectCartItemCount);
  }

  ngOnInit(): void {
    // Load cart from storage on init
    this.store.dispatch(CartActions.loadCartFromStorage());
  }

  updateQuantity(productId: number, quantity: number): void {
    this.store.dispatch(CartActions.updateCartQuantity({ productId, quantity }));
  }

  removeItem(productId: number): void {
    this.store.dispatch(CartActions.removeFromCart({ productId }));
  }

  clearCart(): void {
    this.store.dispatch(CartActions.clearCart());
  }

  getItemTotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }
}