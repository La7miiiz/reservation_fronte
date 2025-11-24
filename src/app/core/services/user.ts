import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
private apiUrl = '/api/utilisateurs/me';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, data);
  }
  getLogs() {
  return this.http.get<any[]>('/api/utilisateurs/logs');
}
getAllUsers() {
  return this.http.get<any[]>('/api/utilisateurs');
}
getAllReservations() {
  return this.http.get<any[]>('/api/reservations');
}
cancelReservation(id: number) {
  return this.http.delete(`/api/reservations/${id}`);
}
}
