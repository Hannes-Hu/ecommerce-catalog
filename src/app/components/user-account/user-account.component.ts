import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/auth.model';
import { AppState } from '../../store/models/app-state.model';
import * as AuthActions from '../../store/actions/auth.actions';
import * as AuthSelectors from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent {
  user$: Observable<User | null>;
  loading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(AuthSelectors.selectCurrentUser);
    this.loading$ = this.store.select(AuthSelectors.selectAuthLoading);
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  getInitials(user: User): string {
    return (user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '');
  }
}