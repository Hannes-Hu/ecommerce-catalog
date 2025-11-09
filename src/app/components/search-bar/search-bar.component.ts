import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';
import { Subject } from 'rxjs';

// NgRx imports
import * as FilterActions from '../../store/actions/filter.actions';
import * as FilterSelectors from '../../store/selectors/products.selectors';
import { AppState } from '../../store/models/app-state.model';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <div class="input-group">
        <span class="input-group-text bg-light border-end-0">
          <i class="bi bi-search text-muted"></i>
        </span>
        <input 
          type="text" 
          class="form-control border-start-0" 
          placeholder="Search products..."
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearchChange()"
        >
        <button 
          *ngIf="searchTerm" 
          class="btn btn-outline-secondary" 
          type="button"
          (click)="clearSearch()"
        >
          <i class="bi bi-x"></i>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 400px;
    }
    .form-control:focus {
      box-shadow: none;
      border-color: #dee2e6;
    }
  `]
})
export class SearchBarComponent implements OnInit {
  searchTerm: string = '';
  private searchSubject = new Subject<string>();

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // Debounce search input
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.store.dispatch(FilterActions.updateSearchTerm({ searchTerm }));
    });

    // Initialize with current filter
    this.store.select(FilterSelectors.selectFilters).pipe(
      take(1)
    ).subscribe(filters => {
      this.searchTerm = filters.searchTerm;
    });
  }

  onSearchChange(): void {
    this.searchSubject.next(this.searchTerm);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.store.dispatch(FilterActions.updateSearchTerm({ searchTerm: '' }));
  }
}