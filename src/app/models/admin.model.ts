export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  pendingOrders: number;
  lowStockProducts: number;
}

export interface AdminUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  registrationDate: Date;
  orderCount: number;
  totalSpent: number;
  isActive: boolean;
}

export interface AdminProduct {
  id: number;
  title: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  sales: number;
  status: 'active' | 'inactive';
  lastUpdated: Date;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  items: number;
}