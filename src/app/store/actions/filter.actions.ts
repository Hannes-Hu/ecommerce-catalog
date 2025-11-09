import { createAction, props } from '@ngrx/store';
import { ProductFilter } from '../../models/filter.model';

// Update Search
export const updateSearchTerm = createAction(
  '[Filter] Update Search Term',
  props<{ searchTerm: string }>()
);

// Update Category Filter
export const updateCategoryFilter = createAction(
  '[Filter] Update Category Filter',
  props<{ category: string | null }>()
);

// Update Price Filter
export const updatePriceFilter = createAction(
  '[Filter] Update Price Filter',
  props<{ minPrice: number | null; maxPrice: number | null }>()
);

// Update Rating Filter
export const updateRatingFilter = createAction(
  '[Filter] Update Rating Filter',
  props<{ minRating: number | null }>()
);

// Update Sort 
export const updateSort = createAction(
  '[Filter] Update Sort',
  props<{ sortBy: 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc' | 'name-desc' | null }>()
);

// Reset Filters
export const resetFilters = createAction(
  '[Filter] Reset Filters'
);

// Set Available Categories
export const setAvailableCategories = createAction(
  '[Filter] Set Available Categories',
  props<{ categories: string[] }>()
);