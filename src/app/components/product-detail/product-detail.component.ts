import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map, take } from 'rxjs';
import { Product } from '../../models/product.model';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

// NgRx imports
import * as ProductsActions from '../../store/actions/products.actions';
import * as CartActions from '../../store/actions/cart.actions';
import * as ProductsSelectors from '../../store/selectors/products.selectors';
import * as CartSelectors from '../../store/selectors/products.selectors';
import { AppState } from '../../store/models/app-state.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingSpinnerComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product | null>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  isInCart$: Observable<boolean>;
  quantityInCart$: Observable<number>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.product$ = this.store.select(ProductsSelectors.selectAllProducts).pipe(
      map(products => {
        const productId = +this.route.snapshot.params['id'];
        return products.find(p => p.id === productId) || null;
      })
    );
    this.loading$ = this.store.select(ProductsSelectors.selectProductsLoading);
    this.error$ = this.store.select(ProductsSelectors.selectProductsError);
    
    // Cart selectors
    this.isInCart$ = this.store.select(
      CartSelectors.selectIsInCart(+this.route.snapshot.params['id'])
    );
    this.quantityInCart$ = this.store.select(
      CartSelectors.selectProductQuantityInCart(+this.route.snapshot.params['id'])
    );
  }

  ngOnInit(): void {
    const productId = +this.route.snapshot.params['id'];
    this.store.dispatch(ProductsActions.loadProductDetails({ productId }));
  }

  addToCart(): void {
    this.product$.pipe(take(1)).subscribe(product => {
      if (product) {
        this.store.dispatch(CartActions.addToCart({ product, quantity: 1 }));
      }
    });
  }
}