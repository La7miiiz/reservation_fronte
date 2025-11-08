import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from "../../shared/side-nav/side-nav";
@Component({
  selector: 'app-rooms-list',
  standalone: true,
  imports: [CommonModule, SideNavComponent],
  templateUrl: './rooms-list.html',
  styleUrls: ['./rooms-list.css'],
})
export class RoomsListComponent {
  private router = inject(Router);

  rooms = [
    {
      name: 'Salle A',
      description: 'Grande salle lumineuse, idéale pour réunions et séminaires.',
      capacity: 30,
    },
    {
      name: 'Salle B',
      description: 'Salle de conférence moderne avec projecteur.',
      capacity: 20,
    },
    {
      name: 'Salle C',
      description: 'Petite salle pour ateliers et réunions en petit groupe.',
      capacity: 10,
    }
  ];

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
  this.router.navigate(['/reservations'], { queryParams: { room: room.name } });
}
}
