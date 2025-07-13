import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // 🟢 Auth: Login
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data, {
      responseType: 'json',
    });
  }

  // 🟢 Auth: Signup/Register
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, data, {
      responseType: 'json',
    });
  }

  // ✏️ Profile: Update user info
  updateUser(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/auth/update`, data, {
      responseType: 'json',
    });
  }

  // 🔐 Account Security: Change password
  changePassword(data: {
    email: string;
    newPassword: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/change-password`, data, {
      responseType: 'json',
    });
  }

  // 📊 Dashboard Metrics
  getOrderCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(
      `${this.baseUrl}/metrics/orders/count`
    );
  }

  getActivePrescriptions(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(
      `${this.baseUrl}/metrics/prescriptions/active`
    );
  }

  getSavings(): Observable<{ amount: number }> {
    return this.http.get<{ amount: number }>(
      `${this.baseUrl}/metrics/savings/amount`
    );
  }

  getRewards(): Observable<{ points: number }> {
    return this.http.get<{ points: number }>(
      `${this.baseUrl}/metrics/rewards/total`
    );
  }
}
