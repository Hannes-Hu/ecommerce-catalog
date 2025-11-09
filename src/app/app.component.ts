import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './store/models/app-state.model';
import * as AuthActions from './store/actions/auth.actions';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerce-catalog';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // Check authentication status when app starts
    this.store.dispatch(AuthActions.checkAuth());
  }
}