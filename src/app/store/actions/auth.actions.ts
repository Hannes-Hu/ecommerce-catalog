import { createAction, props } from '@ngrx/store';
import { User, LoginCredentials, RegisterCredentials, AuthResponse } from '../../models/auth.model';

// Login
export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginCredentials }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ authResponse: AuthResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// Register
export const register = createAction(
  '[Auth] Register',
  props<{ credentials: RegisterCredentials }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ authResponse: AuthResponse }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

// Logout
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

// Check Authentication
export const checkAuth = createAction('[Auth] Check Authentication');
export const checkAuthSuccess = createAction(
  '[Auth] Check Auth Success',
  props<{ user: User; token: string }>()
);
export const checkAuthFailure = createAction('[Auth] Check Auth Failure');

// Clear Error
export const clearAuthError = createAction('[Auth] Clear Error');