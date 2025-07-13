import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) {}

  // ✅ Securely attach the token to each request
  private getAuthHeaders(): HttpHeaders {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      throw new Error('User is not authenticated');
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // ✅ Add product to cart
  addToCart(item: CartItem): Observable<CartItem> {
    const payload = {
      userId: item.userId,
      productId: item.productId,
      quantity: item.quantity,
    };

    return this.http.post<CartItem>(`${this.apiUrl}/add`, payload, {
      headers: this.getAuthHeaders(),
    });
  }

  // ✅ Fetch cart items for a user
  getCart(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/${userId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // 🔄 You can add more methods like removeCartItem(), clearCart(), etc. as needed
}
