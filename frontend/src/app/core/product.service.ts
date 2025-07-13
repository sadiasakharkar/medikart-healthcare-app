// src/app/core/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/admin/products';

  constructor(private http: HttpClient) {}

  // ✅ Add a new product
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, product);
  }

  // ✅ Get all products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  // ✅ Delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  // ✅ Update a product
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, product);
  }

  // ✅ Get product by ID (optional for edit feature)
  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
