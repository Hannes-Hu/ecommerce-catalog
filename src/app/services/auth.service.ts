import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { User, LoginCredentials, RegisterCredentials, AuthResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://fakestoreapi.com';
  private usersKey = 'ecommerce_users';

  constructor(private http: HttpClient) {}

  // Mock login - in real app, this would call your backend API
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return of(this.mockLogin(credentials)).pipe(delay(1000));
  }

  // Mock register - in real app, this would call the backend API
  register(credentials: RegisterCredentials): Observable<AuthResponse> {
    return of(this.mockRegister(credentials)).pipe(delay(1000));
  }

  private mockLogin(credentials: LoginCredentials): AuthResponse {
    // Get users from localStorage or initialize with demo users
    const users = this.getStoredUsers();
    
    // Add demo users if none exist
    if (users.length === 0) {
      this.initializeDemoUsers();
      return this.mockLogin(credentials); 
    }
    
    // Find user by email (in real app, this would be an API call)
    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('User not found. Please use demo credentials: john@example.com / password123');
    }

    // Simple password check (in real app, this would be handled by backend)
    if (credentials.password !== 'password123') { 
      throw new Error('Invalid password. Please use: password123');
    }

    const token = this.generateToken();
    
    return {
      user,
      token
    };
  }

  private initializeDemoUsers(): void {
    const demoUsers: User[] = [
      {
        id: 1,
        email: 'john@example.com',
        username: 'johndoe',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890'
      },
      {
        id: 2,
        email: 'admin@example.com',
        username: 'admin',
        firstName: 'Admin',
        lastName: 'User',
        phone: '+1234567891'
      },
      {
        id: 3, 
        email: 'sarah@example.com',
        username: 'sarahsmith',
        firstName: 'Sarah',
        lastName: 'Smith',
        phone: '+1234567892'
      }
    ];

    localStorage.setItem(this.usersKey, JSON.stringify(demoUsers));
  }

  private mockRegister(credentials: RegisterCredentials): AuthResponse {
    const users = this.getStoredUsers();
    
    // Initialize demo users if none exist
    if (users.length === 0) {
      this.initializeDemoUsers();
    }
    
    // Check if user already exists
    if (users.find(u => u.email === credentials.email)) {
      throw new Error('User already exists');
    }

    // Create new user
    const newUser: User = {
      id: Date.now(), 
      email: credentials.email,
      username: credentials.username,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      phone: credentials.phone
    };

    // Save user to localStorage
    users.push(newUser);
    localStorage.setItem(this.usersKey, JSON.stringify(users));

    const token = this.generateToken();
    
    return {
      user: newUser,
      token
    };
  }

  private getStoredUsers(): User[] {
    const usersStr = localStorage.getItem(this.usersKey);
    return usersStr ? JSON.parse(usersStr) : [];
  }

  private generateToken(): string {
    return 'fake_jwt_token_' + Math.random().toString(36).substr(2);
  }

  // Get current user from token
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}