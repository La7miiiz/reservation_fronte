import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../../shared/side-nav/side-nav';

@Component({
  selector: 'app-reservation-history',
  standalone: true,
  imports: [CommonModule, SideNavComponent],
  templateUrl: './reservation-history.html',
  styleUrls: ['./reservation-history.css'],
})
export class ReservationHistoryComponent {
  reservations = [
    // Replace with real/loaded data from a service
    { room: 'Salle A', date: '2025-11-10', startTime: '09:00', endTime: '11:00' },
    { room: 'Salle B', date: '2025-11-09', startTime: '14:00', endTime: '16:00' }
  ];
}
