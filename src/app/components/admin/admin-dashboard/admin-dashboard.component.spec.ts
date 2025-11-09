import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminService } from '../../../services/admin.service';
import { of } from 'rxjs';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let store: MockStore;
  let adminService: jasmine.SpyObj<AdminService>;

  const mockStats = {
    totalProducts: 10,
    totalOrders: 5,
    totalUsers: 3,
    totalRevenue: 1000,
    pendingOrders: 2,
    lowStockProducts: 1
  };

  beforeEach(async () => {
    const adminServiceSpy = jasmine.createSpyObj('AdminService', [
      'getDashboardStats',
      'getUsers',
      'getOrders',
      'getProducts'
    ]);

    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent],
      providers: [
        provideMockStore({}),
        { provide: AdminService, useValue: adminServiceSpy }
      ]
    }).compileComponents();

    adminService = TestBed.inject(AdminService) as jasmine.SpyObj<AdminService>;
    adminService.getDashboardStats.and.returnValue(of(mockStats));
    adminService.getUsers.and.returnValue(of([]));
    adminService.getOrders.and.returnValue(of([]));
    adminService.getProducts.and.returnValue(of([]));

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard data on init', () => {
    expect(adminService.getDashboardStats).toHaveBeenCalled();
    expect(adminService.getUsers).toHaveBeenCalled();
    expect(adminService.getOrders).toHaveBeenCalled();
    expect(adminService.getProducts).toHaveBeenCalled();
  });

  it('should display loading state initially', () => {
    component.loading = true;
    fixture.detectChanges();
    
    const loadingElement = fixture.nativeElement.querySelector('.spinner-border');
    expect(loadingElement).toBeTruthy();
  });
});