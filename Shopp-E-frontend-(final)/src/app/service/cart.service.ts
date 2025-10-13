import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CartItem {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private BASE_URL = 'http://localhost:8088/product_db/api/cart'; // ✅ full backend URL

  constructor(private http: HttpClient) {}

  getCartForUser(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.BASE_URL}?userId=${userId}`);
  }

  removeItem(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${cartItemId}`);
  }
}
