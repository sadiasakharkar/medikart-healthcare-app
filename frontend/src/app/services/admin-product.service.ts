import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/admin/products';

  constructor(private http: HttpClient) {}

  addProduct(product: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/admin/products', product); // ✅ No /add
  }

  // ✅ Fetch all products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  // ✅ Delete a product by ID
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  // (Optional) ✅ Update a product
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, product);
  }

  // (Optional) ✅ Get a product by ID
  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
