import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { AdminStats, AdminUser, AdminProduct, AdminOrder } from '../models/admin.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private usersKey = 'ecommerce_users';
  private ordersKey = 'ecommerce_orders';
  private productsKey = 'ecommerce_products';

  constructor(private http: HttpClient) {}

  // Mock admin data - in real app, these would be API calls
  getDashboardStats(): Observable<AdminStats> {
    return of(this.calculateAdminStats()).pipe(delay(500));
  }

  getUsers(): Observable<AdminUser[]> {
    return of(this.getAdminUsers()).pipe(delay(800));
  }

  getProducts(): Observable<AdminProduct[]> {
    return of(this.getAdminProducts()).pipe(delay(600));
  }

  getOrders(): Observable<AdminOrder[]> {
    return of(this.getAdminOrders()).pipe(delay(700));
  }

  updateProduct(productId: number, updates: Partial<AdminProduct>): Observable<AdminProduct> {
    return of(this.mockUpdateProduct(productId, updates)).pipe(delay(400));
  }

  updateOrderStatus(orderId: string, status: string): Observable<AdminOrder> {
    return of(this.mockUpdateOrderStatus(orderId, status)).pipe(delay(400));
  }

  private calculateAdminStats(): AdminStats {
    const users = this.getStoredUsers();
    const orders = this.getStoredOrders();
    const products = this.getStoredProducts();

    const totalRevenue = orders.reduce((sum, order: any) => sum + order.orderSummary.total, 0);
    const pendingOrders = orders.filter((order: any) => order.status === 'pending').length;
    const lowStockProducts = products.filter((product: any) => product.stock < 10).length;

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalUsers: users.length,
      totalRevenue,
      pendingOrders,
      lowStockProducts
    };
  }

  private getAdminUsers(): AdminUser[] {
    const users = this.getStoredUsers();
    const orders = this.getStoredOrders();

    return users.map((user: any) => {
      const userOrders = orders.filter((order: any) => order.userId === user.id);
      const totalSpent = userOrders.reduce((sum: number, order: any) => sum + order.orderSummary.total, 0);

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        registrationDate: new Date(user.registrationDate || Date.now()),
        orderCount: userOrders.length,
        totalSpent,
        isActive: true
      };
    });
  }

  private getAdminProducts(): AdminProduct[] {
    const products = this.getStoredProducts();
    const orders = this.getStoredOrders();

    return products.map((product: any) => {
      const productOrders = orders.flatMap((order: any) => 
        order.items.filter((item: any) => item.product.id === product.id)
      );
      const sales = productOrders.reduce((sum: number, item: any) => sum + item.quantity, 0);

      return {
        id: product.id,
        title: product.title,
        category: product.category,
        price: product.price,
        stock: product.stock || Math.floor(Math.random() * 100), // Mock stock
        rating: product.rating.rate,
        sales,
        status: 'active',
        lastUpdated: new Date()
      };
    });
  }

  private getAdminOrders(): AdminOrder[] {
    const orders = this.getStoredOrders();
    const users = this.getStoredUsers();

    return orders.map((order: any) => {
      const user = users.find((u: any) => u.id === order.userId);
      
      return {
        id: order.id,
        customerName: user ? `${user.firstName} ${user.lastName}` : 'Unknown Customer',
        customerEmail: user?.email || 'unknown@example.com',
        total: order.orderSummary.total,
        status: order.status,
        orderDate: new Date(order.orderDate),
        items: order.items.length
      };
    });
  }

  private mockUpdateProduct(productId: number, updates: Partial<AdminProduct>): AdminProduct {
    const products = this.getStoredProducts();
    const productIndex = products.findIndex((p: any) => p.id === productId);
    
    if (productIndex !== -1) {
      products[productIndex] = { ...products[productIndex], ...updates };
      localStorage.setItem(this.productsKey, JSON.stringify(products));
    }

    return this.getAdminProducts().find(p => p.id === productId)!;
  }

  private mockUpdateOrderStatus(orderId: string, status: string): AdminOrder {
    const orders = this.getStoredOrders();
    const orderIndex = orders.findIndex((o: any) => o.id === orderId);
    
    if (orderIndex !== -1) {
      orders[orderIndex].status = status;
      localStorage.setItem(this.ordersKey, JSON.stringify(orders));
    }

    return this.getAdminOrders().find(o => o.id === orderId)!;
  }

  private getStoredUsers(): any[] {
    const usersStr = localStorage.getItem(this.usersKey);
    return usersStr ? JSON.parse(usersStr) : [];
  }

  private getStoredOrders(): any[] {
    const ordersStr = localStorage.getItem(this.ordersKey);
    return ordersStr ? JSON.parse(ordersStr) : [];
  }

  private getStoredProducts(): any[] {
    const productsStr = localStorage.getItem(this.productsKey);
    return productsStr ? JSON.parse(productsStr) : [];
  }
}