import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import * as ProductsActions from '../actions/products.actions';

@Injectable()
export class ProductsEffects {

  // Load Products
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map(products => ProductsActions.loadProductsSuccess({ products })),
          catchError(error => of(ProductsActions.loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  // Load Products by Category
  loadProductsByCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductsByCategory),
      mergeMap(({ category }) =>
        this.productService.getProductsByCategory(category).pipe(
          map(products => ProductsActions.loadProductsByCategorySuccess({ products })),
          catchError(error => of(ProductsActions.loadProductsByCategoryFailure({ error: error.message })))
        )
      )
    )
  );

  // Load Categories
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadCategories),
      mergeMap(() =>
        this.productService.getCategories().pipe(
          map(categories => ProductsActions.loadCategoriesSuccess({ categories })),
          catchError(error => of(ProductsActions.loadCategoriesFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}