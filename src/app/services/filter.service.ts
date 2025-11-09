import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { ProductFilter, FilterOptions } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterSubject = new BehaviorSubject<ProductFilter>(this.getDefaultFilter());
  private productsSubject = new BehaviorSubject<Product[]>([]);
  
  public filter$ = this.filterSubject.asObservable();
  public filteredProducts$: Observable<Product[]>;
  public filterOptions$: Observable<FilterOptions>;

  constructor() {
    this.filteredProducts$ = combineLatest([
      this.productsSubject.asObservable(),
      this.filter$
    ]).pipe(
      map(([products, filter]) => this.applyFilters(products, filter))
    );

    this.filterOptions$ = this.productsSubject.asObservable().pipe(
      map(products => this.calculateFilterOptions(products))
    );
  }

  // Set products to filter
  setProducts(products: Product[]): void {
    this.productsSubject.next(products);
  }

  // Update filter
  updateFilter(update: Partial<ProductFilter>): void {
    const currentFilter = this.filterSubject.value;
    this.filterSubject.next({ ...currentFilter, ...update });
  }

  // Reset filter to default
  resetFilter(): void {
    this.filterSubject.next(this.getDefaultFilter());
  }

  // Get current filter state
  getCurrentFilter(): ProductFilter {
    return this.filterSubject.value;
  }

  // Apply all filters to products
  private applyFilters(products: Product[], filter: ProductFilter): Product[] {
    let filteredProducts = [...products];

    // Search filter
    if (filter.searchTerm) {
      const searchTerm = filter.searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (filter.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === filter.category
      );
    }

    // Price range filter
    if (filter.minPrice !== null) {
      filteredProducts = filteredProducts.filter(product =>
        product.price >= filter.minPrice!
      );
    }

    if (filter.maxPrice !== null) {
      filteredProducts = filteredProducts.filter(product =>
        product.price <= filter.maxPrice!
      );
    }

    // Rating filter
    if (filter.minRating !== null) {
      filteredProducts = filteredProducts.filter(product =>
        product.rating.rate >= filter.minRating!
      );
    }

    // Sorting
    if (filter.sortBy) {
      filteredProducts = this.sortProducts(filteredProducts, filter.sortBy);
    }

    return filteredProducts;
  }

  // Sort products based on criteria
  private sortProducts(products: Product[], sortBy: string): Product[] {
    const sortedProducts = [...products];
    
    switch (sortBy) {
      case 'price-asc':
        return sortedProducts.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sortedProducts.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
      case 'name-asc':
        return sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return sortedProducts;
    }
  }

  // Calculate available filter options from products
  private calculateFilterOptions(products: Product[]): FilterOptions {
    if (products.length === 0) {
      return { categories: [], priceRange: { min: 0, max: 0 } };
    }

    const prices = products.map(p => p.price);
    const minPrice = Math.floor(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));

    const categories = [...new Set(products.map(p => p.category))];

    return {
      categories,
      priceRange: { min: minPrice, max: maxPrice }
    };
  }

  private getDefaultFilter(): ProductFilter {
    return {
      searchTerm: '',
      category: null,
      minPrice: null,
      maxPrice: null,
      minRating: null,
      sortBy: null
    };
  }
}