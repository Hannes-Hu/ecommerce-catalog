import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../models/app-state.model';

// Feature selectors
export const selectProductsState = createFeatureSelector<AppState['products']>('products');
export const selectCartState = createFeatureSelector<AppState['cart']>('cart');
export const selectFilterState = createFeatureSelector<AppState['filters']>('filters');

// Products selectors
export const selectAllProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state) => state.error
);

export const selectCategories = createSelector(
  selectProductsState,
  (state) => state.categories
);

// Cart selectors
export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

export const selectCartTotal = createSelector(
  selectCartState,
  (state) => state.total
);

export const selectCartItemCount = createSelector(
  selectCartState,
  (state) => state.itemCount
);

export const selectIsInCart = (productId: number) => createSelector(
  selectCartItems,
  (items) => items.some(item => item.product.id === productId)
);

export const selectProductQuantityInCart = (productId: number) => createSelector(
  selectCartItems,
  (items) => {
    const item = items.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  }
);

// Filter selectors
export const selectFilters = createSelector(
  selectFilterState,
  (state) => state.filters
);

export const selectAvailableCategories = createSelector(
  selectFilterState,
  (state) => state.availableCategories
);

// Combined selectors for filtered products
export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectFilters,
  (products, filters) => {
    let filteredProducts = [...products];

    // Search filter
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (filters.category) {
      filteredProducts = filteredProducts.filter(product =>
        product.category === filters.category
      );
    }

    // Price range filter
    if (filters.minPrice !== null) {
      filteredProducts = filteredProducts.filter(product =>
        product.price >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== null) {
      filteredProducts = filteredProducts.filter(product =>
        product.price <= filters.maxPrice!
      );
    }

    // Rating filter
    if (filters.minRating !== null) {
      filteredProducts = filteredProducts.filter(product =>
        product.rating.rate >= filters.minRating!
      );
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating-desc':
          filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
          break;
        case 'name-asc':
          filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'name-desc':
          filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
          break;
      }
    }

    return filteredProducts;
  }
);