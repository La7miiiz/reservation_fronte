// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8081/api/auth'; // Change port if needed

  constructor(private http: HttpClient) {}

  // Signup
  signup(payload: { email: string; motDePasse: string; role?: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, payload);
  }

  // Login
  login(credentials: { email: string; motDePasse: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, credentials).pipe(
      tap((res) => {
        if (res?.token) {
          localStorage.setItem('salle_token', res.token);
        }
      })
    );
  }

  // Logout
  logout(): void {
    localStorage.removeItem('salle_token');
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('salle_token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('salle_token');
  }
}
