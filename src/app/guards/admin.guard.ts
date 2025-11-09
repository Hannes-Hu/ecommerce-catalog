import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AppState } from '../store/models/app-state.model';
import * as AuthSelectors from '../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.select(AuthSelectors.selectCurrentUser).pipe(
      take(1),
      map(user => {
        // Simple admin check - in real app I would check this from backend
        const isAdmin = user?.email === 'admin@example.com' || user?.id === 1;
        
        if (!isAdmin) {
          this.router.navigate(['/']);
          return false;
        }
        
        return true;
      })
    );
  }
}