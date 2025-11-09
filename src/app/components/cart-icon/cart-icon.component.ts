import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Cart } from '../../models/cart.model';

// NgRx imports
import * as CartSelectors from '../../store/selectors/products.selectors';
import { AppState } from '../../store/models/app-state.model';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <!-- Desktop Cart Icon -->
    <div class="d-none d-lg-block">
      <button class="btn btn-outline-light position-relative px-3 py-2" routerLink="/cart">
        <i class="bi bi-cart3 me-2"></i>
        Shopping Cart
        <span *ngIf="(cart$ | async)?.itemCount && (cart$ | async)!.itemCount > 0" 
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {{ (cart$ | async)!.itemCount }}
          <span class="visually-hidden">items in cart</span>
        </span>
      </button>
    </div>

    <!-- Mobile Cart Icon (in header) -->
    <div class="d-lg-none">
      <button class="btn btn-outline-light position-relative" routerLink="/cart">
        <i class="bi bi-cart3"></i>
        <span *ngIf="(cart$ | async)?.itemCount && (cart$ | async)!.itemCount > 0" 
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style="font-size: 0.6rem; min-width: 18px;">
          {{ (cart$ | async)!.itemCount }}
        </span>
      </button>
    </div>
  `,
  styles: [`
    .badge {
      font-size: 0.7em;
    }
    button {
      transition: all 0.3s ease;
      border-radius: 8px;
    }
    button:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
  `]
})
export class CartIconComponent implements OnInit {
  cart$!: Observable<Cart>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.cart$ = this.store.select(CartSelectors.selectCartState);
  }
}