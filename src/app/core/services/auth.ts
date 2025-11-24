import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8081/api/auth'; 

  constructor(private http: HttpClient) {}

  signup(payload: { email: string; motDePasse: string; role?: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, payload);
  }

  login(credentials: { email: string; motDePasse: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, credentials).pipe(
      tap((res) => {
        if (res?.token) {
          localStorage.setItem('salle_token', res.token);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('salle_token');
  }

  getToken(): string | null {
    return localStorage.getItem('salle_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('salle_token');
  }
}
