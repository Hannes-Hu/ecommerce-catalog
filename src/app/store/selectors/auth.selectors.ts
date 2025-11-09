import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../../models/auth.model';
import { AppState } from '../models/app-state.model';

export const selectAuthState = createFeatureSelector<AppState['auth']>('auth');

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state) => state.token
);