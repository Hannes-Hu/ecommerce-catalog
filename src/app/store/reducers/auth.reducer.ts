import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../../models/auth.model';
import * as AuthActions from '../actions/auth.actions';

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialAuthState,

  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, (state, { authResponse }) => ({
    ...state,
    user: authResponse.user,
    token: authResponse.token,
    isAuthenticated: true,
    loading: false,
    error: null
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error
  })),

  // Register
  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.registerSuccess, (state, { authResponse }) => ({
    ...state,
    user: authResponse.user,
    token: authResponse.token,
    isAuthenticated: true,
    loading: false,
    error: null
  })),

  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error
  })),

  // Logout
  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true
  })),

  on(AuthActions.logoutSuccess, () => initialAuthState),

  // Check Authentication
  on(AuthActions.checkAuth, (state) => ({
    ...state,
    loading: true
  })),

  on(AuthActions.checkAuthSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    loading: false
  })),

  on(AuthActions.checkAuthFailure, () => initialAuthState),

  // Clear Error
  on(AuthActions.clearAuthError, (state) => ({
    ...state,
    error: null
  }))
);