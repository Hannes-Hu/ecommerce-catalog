export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  address?: {
    street: string;
    city: string;
    zipcode: string;
  };
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}