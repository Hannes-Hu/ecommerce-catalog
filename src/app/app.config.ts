import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { reducers } from './store/reducers';
import { ProductsEffects } from './store/effects/products.effects';
import { CartEffects } from './store/effects/cart.effects';
import { AuthEffects } from './store/effects/auth.effects'; 
import { CheckoutEffects } from './store/effects/checkout.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(reducers),
    provideEffects([ProductsEffects, CartEffects, AuthEffects, CheckoutEffects]), 
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ]
};