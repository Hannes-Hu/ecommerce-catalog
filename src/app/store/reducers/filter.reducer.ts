import { createReducer, on } from '@ngrx/store';
import { FilterState } from '../models/app-state.model';
import * as FilterActions from '../actions/filter.actions';
import { ProductFilter } from '../../models/filter.model'; 

const initialFilter: ProductFilter = {  
  searchTerm: '',
  category: null,
  minPrice: null,
  maxPrice: null,
  minRating: null,
  sortBy: null
};

export const initialFilterState: FilterState = {
  filters: initialFilter,  
  availableCategories: []
};

export const filterReducer = createReducer(
  initialFilterState,

  // Update Search
  on(FilterActions.updateSearchTerm, (state, { searchTerm }) => ({
    ...state,
    filters: { ...state.filters, searchTerm }
  })),

  // Update Category
  on(FilterActions.updateCategoryFilter, (state, { category }) => ({
    ...state,
    filters: { ...state.filters, category }
  })),

  // Update Price
  on(FilterActions.updatePriceFilter, (state, { minPrice, maxPrice }) => ({
    ...state,
    filters: { ...state.filters, minPrice, maxPrice }
  })),

  // Update Rating
  on(FilterActions.updateRatingFilter, (state, { minRating }) => ({
    ...state,
    filters: { ...state.filters, minRating }
  })),

  // Update Sort
  on(FilterActions.updateSort, (state, { sortBy }) => ({
    ...state,
    filters: { ...state.filters, sortBy }
  })),

  // Reset Filters
  on(FilterActions.resetFilters, (state) => ({
    ...state,
    filters: initialFilter  
  })),

  // Set Available Categories
  on(FilterActions.setAvailableCategories, (state, { categories }) => ({
    ...state,
    availableCategories: categories
  }))
);