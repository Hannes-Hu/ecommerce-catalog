import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/auth.model';
import { AppState } from '../../store/models/app-state.model';
import * as ProductsActions from '../../store/actions/products.actions';
import * as AuthActions from '../../store/actions/auth.actions';
import * as ProductsSelectors from '../../store/selectors/products.selectors';
import * as AuthSelectors from '../../store/selectors/auth.selectors';
import { CartIconComponent } from '../cart-icon/cart-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CartIconComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories$: Observable<string[]>;
  currentUser$: Observable<User | null>;
  isAuthenticated$: Observable<boolean>;
  isAdmin$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.categories$ = this.store.select(ProductsSelectors.selectCategories);
    this.currentUser$ = this.store.select(AuthSelectors.selectCurrentUser);
    this.isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);
    
    // Check if current user is admin
    this.isAdmin$ = this.currentUser$.pipe(
      map(user => user?.email === 'admin@example.com')
    );
  }

  ngOnInit(): void {
    this.store.dispatch(ProductsActions.loadCategories());
    this.store.dispatch(AuthActions.checkAuth());
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}