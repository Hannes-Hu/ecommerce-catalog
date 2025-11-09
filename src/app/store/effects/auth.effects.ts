import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  // Login Effect
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map(authResponse => AuthActions.loginSuccess({ authResponse })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  // Register Effect
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ credentials }) =>
        this.authService.register(credentials).pipe(
          map(authResponse => AuthActions.registerSuccess({ authResponse })),
          catchError(error => of(AuthActions.registerFailure({ error: error.message })))
        )
      )
    )
  );

  // Login/Register Success - Redirect and Store Token
  authSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
      tap(({ authResponse }) => {
        // Store token in localStorage
        localStorage.setItem('auth_token', authResponse.token);
        localStorage.setItem('user', JSON.stringify(authResponse.user));
        
        // Redirect to home page
        this.router.navigate(['/']);
      })
    ),
    { dispatch: false }
  );

  // Logout Effect
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        // Clear localStorage
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        
        // Redirect to login page
        this.router.navigate(['/login']);
      }),
      map(() => AuthActions.logoutSuccess())
    )
  );

  // Check Authentication on App Start
  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkAuth),
      map(() => {
        const token = localStorage.getItem('auth_token');
        const userStr = localStorage.getItem('user');
        
        if (token && userStr) {
          const user = JSON.parse(userStr);
          return AuthActions.checkAuthSuccess({ user, token });
        } else {
          return AuthActions.checkAuthFailure();
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}