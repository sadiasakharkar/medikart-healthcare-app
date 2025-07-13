import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OverviewService {
  private baseUrl = 'http://localhost:8080/api/metrics';

  constructor(private http: HttpClient) {}

  getOrderCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.baseUrl}/orders/count`);
  }

  getActivePrescriptions(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(
      `${this.baseUrl}/prescriptions/active`
    );
  }

  getRewardPoints(): Observable<{ points: number }> {
    return this.http.get<{ points: number }>(`${this.baseUrl}/rewards/total`);
  }

  getSavings(): Observable<{ amount: number }> {
    return this.http.get<{ amount: number }>(`${this.baseUrl}/savings/amount`);
  }
}
