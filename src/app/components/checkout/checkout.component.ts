import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '../../store/models/app-state.model';
import * as CheckoutActions from '../../store/actions/checkout.actions';
import * as CartActions from '../../store/actions/cart.actions';
import * as CheckoutSelectors from '../../store/selectors/checkout.selectors';
import * as CartSelectors from '../../store/selectors/products.selectors';

import { ShippingAddress, BillingAddress, PaymentMethod } from '../../models/checkout.model';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  currentStep = 1;
  cart$: Observable<Cart>;
  orderSummary$: Observable<any>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  shippingForm!: FormGroup;
  billingForm!: FormGroup;
  paymentForm!: FormGroup;

  sameAsShipping = true;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.cart$ = this.store.select(CartSelectors.selectCartState);
    this.loading$ = this.store.select(CheckoutSelectors.selectCheckoutLoading);
    this.error$ = this.store.select(CheckoutSelectors.selectCheckoutError);

    this.orderSummary$ = combineLatest([
      this.cart$,
      this.store.select(CheckoutSelectors.selectShippingAddress),
      this.store.select(CheckoutSelectors.selectBillingAddress)
    ]).pipe(
      map(([cart, shipping, billing]) => this.calculateOrderSummary(cart, shipping, billing))
    );

    this.initializeForms();
  }

  ngOnInit(): void {
    this.store.dispatch(CheckoutActions.loadCheckoutFromStorage());
  }

  private initializeForms(): void {
    // Shipping Form
    this.shippingForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-()]+$/)]],
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      country: ['United States', [Validators.required]]
    });

    // Billing Form
    this.billingForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5}(-\d{4})?$/)]],
      country: ['United States', [Validators.required]]
    });

    // Payment Form
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      nameOnCard: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onShippingSubmit(): void {
    if (this.shippingForm.valid) {
      const shippingAddress: ShippingAddress = this.shippingForm.value;
      this.store.dispatch(CheckoutActions.updateShippingAddress({ shippingAddress }));
      this.nextStep();
    }
  }

  onBillingSubmit(): void {
    if (this.billingForm.valid || this.sameAsShipping) {
      let billingAddress: BillingAddress;
      
      if (this.sameAsShipping && this.shippingForm.valid) {
        const shipping = this.shippingForm.value;
        billingAddress = {
          sameAsShipping: true,
          firstName: shipping.firstName,
          lastName: shipping.lastName,
          addressLine1: shipping.addressLine1,
          addressLine2: shipping.addressLine2,
          city: shipping.city,
          state: shipping.state,
          zipCode: shipping.zipCode,
          country: shipping.country
        };
      } else {
        billingAddress = {
          ...this.billingForm.value,
          sameAsShipping: false
        };
      }
      
      this.store.dispatch(CheckoutActions.updateBillingAddress({ billingAddress }));
      this.nextStep();
    }
  }

  onPaymentSubmit(): void {
    if (this.paymentForm.valid) {
      const paymentMethod: PaymentMethod = {
        type: 'credit-card',
        ...this.paymentForm.value
      };
      this.store.dispatch(CheckoutActions.updatePaymentMethod({ paymentMethod }));
      this.placeOrder();
    }
  }

  placeOrder(): void {
    this.store.dispatch(CheckoutActions.placeOrder());
  }

  onSameAsShippingChange(checked: boolean): void {
    this.sameAsShipping = checked;
    this.store.dispatch(CheckoutActions.setBillingSameAsShipping({ sameAsShipping: checked }));

    if (checked) {
      this.billingForm.disable();
    } else {
      this.billingForm.enable();
    }
  }

  private calculateOrderSummary(cart: Cart, shipping: any, billing: any) {
    const subtotal = cart.total;
    const shippingCost = 0; // Free shipping for demo
    const tax = subtotal * 0.08;
    const total = subtotal + shippingCost + tax;

    return {
      subtotal,
      shipping: shippingCost,
      tax,
      total,
      itemCount: cart.itemCount
    };
  }
}