import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { ProductFilter, FilterOptions } from '../../models/filter.model';

// NgRx imports
import * as FilterActions from '../../store/actions/filter.actions';
import * as FilterSelectors from '../../store/selectors/products.selectors';
import { AppState } from '../../store/models/app-state.model';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.css']
})
export class ProductFiltersComponent implements OnInit {
  filters$: Observable<ProductFilter>;
  availableCategories$: Observable<string[]>;
  
  // Local form values
  categoryFilter: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minRating: number | null = null;
  sortBy: string = '';

  constructor(private store: Store<AppState>) {
    this.filters$ = this.store.select(FilterSelectors.selectFilters);
    this.availableCategories$ = this.store.select(FilterSelectors.selectAvailableCategories);
  }

  ngOnInit(): void {
    // Subscribe to filter changes to update form
    this.filters$.subscribe(filter => {
      this.categoryFilter = filter.category || '';
      this.minPrice = filter.minPrice;
      this.maxPrice = filter.maxPrice;
      this.minRating = filter.minRating;
      this.sortBy = filter.sortBy || '';
    });
  }

  onCategoryChange(category: string): void {
    const selectedCategory = category || null;
    this.store.dispatch(FilterActions.updateCategoryFilter({ category: selectedCategory }));
  }

  onPriceChange(): void {
    this.store.dispatch(FilterActions.updatePriceFilter({ 
      minPrice: this.minPrice, 
      maxPrice: this.maxPrice 
    }));
  }

  onRatingChange(rating: number | null): void {
    this.store.dispatch(FilterActions.updateRatingFilter({ minRating: rating }));
  }

  onSortChange(sortBy: string): void {
    // Convert string to specific type or null
    const selectedSort = this.convertToSortType(sortBy);
    this.store.dispatch(FilterActions.updateSort({ sortBy: selectedSort }));
  }

  // Helper method to convert string to specific sort type
  private convertToSortType(sortBy: string): 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc' | 'name-desc' | null {
    const validSortTypes = ['price-asc', 'price-desc', 'rating-desc', 'name-asc', 'name-desc'];
    return validSortTypes.includes(sortBy) ? sortBy as any : null;
  }

  clearFilters(): void {
    this.store.dispatch(FilterActions.resetFilters());
  }

  hasActiveFilters(): Observable<boolean> {
    return this.filters$.pipe(
      map(filter => !!(filter.searchTerm || filter.category || filter.minPrice !== null || 
                     filter.maxPrice !== null || filter.minRating !== null || filter.sortBy))
    );
  }
}