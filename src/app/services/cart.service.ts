import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly API_URL = 'http://localhost:8090';
  private cartItems = signal<CartItem[]>([]);

  constructor(private http: HttpClient) {
    // Charger le panier au démarrage si l'utilisateur est connecté
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.loadCart(parseInt(userId));
    }
  }

  private loadCart(userId: number) {
    this.http.get<CartItem[]>(`${this.API_URL}/cart/${userId}`).subscribe({
      next: (items) => this.cartItems.set(items),
      error: (error) => console.error('Erreur lors du chargement du panier:', error)
    });
  }

  addToCart(userId: number, productId: number, quantity: number = 1): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(`${this.API_URL}/cart/add`, {
      userId,
      productId,
      quantity
    });
  }

  getCartItems() {
    return this.cartItems.asReadonly();
  }

  updateQuantity(userId: number, productId: number, quantity: number): Observable<CartItem[]> {
    return this.http.put<CartItem[]>(`${this.API_URL}/cart/update`, {
      userId,
      productId,
      quantity
    });
  }

  removeItem(userId: number, productId: number): Observable<CartItem[]> {
    return this.http.delete<CartItem[]>(`${this.API_URL}/cart/remove`, {
      body: { userId, productId }
    });
  }

  clearCart(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/cart/clear/${userId}`);
  }
} 