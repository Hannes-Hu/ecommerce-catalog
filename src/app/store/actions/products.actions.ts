import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model'; 

// Load Products
export const loadProducts = createAction(
  '[Products] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);

// Load Products by Category
export const loadProductsByCategory = createAction(
  '[Products] Load Products By Category',
  props<{ category: string }>()
);

export const loadProductsByCategorySuccess = createAction(
  '[Products] Load Products By Category Success',
  props<{ products: Product[] }>()
);

export const loadProductsByCategoryFailure = createAction(
  '[Products] Load Products By Category Failure',
  props<{ error: string }>()
);

// Load Categories
export const loadCategories = createAction(
  '[Products] Load Categories'
);

export const loadCategoriesSuccess = createAction(
  '[Products] Load Categories Success',
  props<{ categories: string[] }>()
);

export const loadCategoriesFailure = createAction(
  '[Products] Load Categories Failure',
  props<{ error: string }>()
);

// Product Details
export const loadProductDetails = createAction(
  '[Products] Load Product Details',
  props<{ productId: number }>()
);

export const loadProductDetailsSuccess = createAction(
  '[Products] Load Product Details Success',
  props<{ product: Product }>()
);

export const loadProductDetailsFailure = createAction(
  '[Products] Load Product Details Failure',
  props<{ error: string }>()
);