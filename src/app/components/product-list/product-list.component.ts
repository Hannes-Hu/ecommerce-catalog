import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import { CartItem } from '../../models/cart.model';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ProductFiltersComponent } from '../product-filters/product-filters.component';

// NgRx imports
import * as ProductsActions from '../../store/actions/products.actions';
import * as CartActions from '../../store/actions/cart.actions';
import * as FilterActions from '../../store/actions/filter.actions';
import * as ProductsSelectors from '../../store/selectors/products.selectors';
import * as CartSelectors from '../../store/selectors/products.selectors';
import * as FilterSelectors from '../../store/selectors/products.selectors';
import { AppState } from '../../store/models/app-state.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    LoadingSpinnerComponent,
    SearchBarComponent,
    ProductFiltersComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  // Observables from store
  products$: Observable<Product[]>;
  filteredProducts$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  cartItems$: Observable<CartItem[]>;
  
  // Local state
  selectedCategory: string | null = null;
  private routeSubscription!: Subscription; 

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    // Initialize observables
    this.products$ = this.store.select(ProductsSelectors.selectAllProducts);
    this.filteredProducts$ = this.store.select(ProductsSelectors.selectFilteredProducts);
    this.loading$ = this.store.select(ProductsSelectors.selectProductsLoading);
    this.error$ = this.store.select(ProductsSelectors.selectProductsError);
    this.cartItems$ = this.store.select(CartSelectors.selectCartItems);
  }

  ngOnInit(): void {
    // Load initial data
    this.store.dispatch(ProductsActions.loadProducts());
    this.store.dispatch(ProductsActions.loadCategories());

    // Subscribe to route changes
    this.routeSubscription = this.route.params.subscribe(params => {
      this.selectedCategory = params['category'] || null;
      
      if (this.selectedCategory) {
        this.store.dispatch(ProductsActions.loadProductsByCategory({ category: this.selectedCategory }));
        this.store.dispatch(FilterActions.updateCategoryFilter({ category: this.selectedCategory }));
      } else {
        this.store.dispatch(ProductsActions.loadProducts());
        this.store.dispatch(FilterActions.updateCategoryFilter({ category: null }));
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  addToCart(product: Product): void {
    this.store.dispatch(CartActions.addToCart({ product, quantity: 1 }));
  }

  isInCart(productId: number): Observable<boolean> {
    return this.store.select(CartSelectors.selectIsInCart(productId));
  }

  clearAllFilters(): void {
    this.store.dispatch(FilterActions.resetFilters());
  }
}