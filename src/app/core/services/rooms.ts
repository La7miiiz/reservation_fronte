import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private apiUrl = 'http://localhost:8081/api/salles'; 

  constructor(private http: HttpClient) {}

  getRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  createRoom(room: any) {
  return this.http.post('http://localhost:8081/api/salles', room);
}
  deleteRoom(id: number) {
  return this.http.delete(`http://localhost:8081/api/salles/${id}`);
}


}
