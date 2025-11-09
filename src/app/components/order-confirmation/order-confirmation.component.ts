import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../../store/models/app-state.model';
import * as CheckoutSelectors from '../../store/selectors/checkout.selectors';
import { Order } from '../../models/checkout.model';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {
  order$: Observable<Order | null>;
  orderId!: string;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.order$ = this.store.select(CheckoutSelectors.selectCurrentOrder);
  }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['id'];
  }
}