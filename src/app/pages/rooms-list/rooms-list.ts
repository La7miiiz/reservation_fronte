import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from "../../shared/side-nav/side-nav";
import { RoomsService } from '../../core/services/rooms';

@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [CommonModule, SideNavComponent],
  templateUrl: './rooms-list.html',
  styleUrls: ['./rooms-list.css'],
})
export class RoomsListComponent implements OnInit {
  rooms: any[] = [];
  isAdmin = false;

  constructor(private router: Router, private roomsService: RoomsService) {}

  ngOnInit() {
    this.isAdmin = this.getUserRole() === 'ADMIN';
    this.reloadRooms();
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('salle_token');
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch {
      return null;
    }
  }

  editRoom(salle: any) {
    this.router.navigate(['/rooms/edit', salle.id]);
  }

  deleteRoom(salle: any) {
    if (confirm(`Voulez-vous vraiment supprimer ${salle.nom} ?`)) {
      this.roomsService.deleteRoom(salle.id).subscribe({
        next: () => this.reloadRooms(),
      });
    }
  }

  reloadRooms() {
    this.roomsService.getRooms().subscribe(data => {
      this.rooms = data;
    });
  }

  openCreateRoomDialog() {
    alert("Page de création de salle à implémenter !");
  }

  goTo(section: string) {
    switch (section) {
      case 'reservations':
        this.router.navigateByUrl('/reservations');
        break;
      case 'profile':
        this.router.navigateByUrl('/profile');
        break;
      case 'home':
        this.router.navigateByUrl('/home');
        break;
      case 'rooms':
        this.router.navigateByUrl('/rooms');
        break;
    }
  }

  reserveRoom(room: any) {
  this.router.navigate(['/reservations'], { queryParams: { room: room.nom || room.name } });
}
  goToCreateRoom() {
    this.router.navigate(['/rooms/create']);
  }
  
}
