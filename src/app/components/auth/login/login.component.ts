import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store/models/app-state.model';
import * as AuthActions from '../../../store/actions/auth.actions';
import * as AuthSelectors from '../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
    this.error$ = this.store.select(AuthSelectors.selectAuthError);
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearAuthError());
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(AuthActions.login({
        credentials: this.loginForm.value
      }));
    }
  }

  // Demo login for quick testing
  demoLogin(): void {
    this.loginForm.patchValue({
      email: 'john@example.com',
      password: 'password123'
    });
  }

  // Additional demo users for testing
  adminDemoLogin(): void {
    this.loginForm.patchValue({
      email: 'admin@example.com',
      password: 'password123'
    });
  }
}