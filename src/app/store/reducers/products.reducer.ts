import { createReducer, on } from '@ngrx/store';
import { ProductsState } from '../models/app-state.model';
import * as ProductsActions from '../actions/products.actions';

export const initialProductsState: ProductsState = {
  products: [],
  loading: false,
  error: null,
  categories: []
};

export const productsReducer = createReducer(
  initialProductsState,

  // Load Products
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
    error: null
  })),

  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Products by Category
  on(ProductsActions.loadProductsByCategory, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ProductsActions.loadProductsByCategorySuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false,
    error: null
  })),

  on(ProductsActions.loadProductsByCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load Categories
  on(ProductsActions.loadCategories, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ProductsActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
    loading: false,
    error: null
  })),

  on(ProductsActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Product Details
  on(ProductsActions.loadProductDetails, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(ProductsActions.loadProductDetailsSuccess, (state) => ({
    ...state,
    loading: false,
    error: null
  })),

  on(ProductsActions.loadProductDetailsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);