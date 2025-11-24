import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../../shared/side-nav/side-nav';
import { ReservationService } from '../../core/services/reservation';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservation-history',
  standalone: true,
  imports: [CommonModule, SideNavComponent],
  templateUrl: './reservation-history.html',
  styleUrls: ['./reservation-history.css'],
})
export class ReservationHistoryComponent implements OnInit {
  reservations: any[] = [];
  loading = true;
  error: string | null = null;
  isAdmin = true; 

 constructor(
  private reservationService: ReservationService,
  private router: Router
) {}

  ngOnInit() {
    this.reservationService.getMyReservations().subscribe({
      next: (res: any[]) => {
        this.reservations = res;
        this.loading = false;
      },
      error: err => {
        this.error = "Erreur lors du chargement des réservations.";
        this.loading = false;
      }
    });
  }

  deleteReservation(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cette réservation ?")) {
      this.reservationService.deleteReservation(id).subscribe({
        next: () => {
          this.reservations = this.reservations.filter(r => r.id !== id);
        },
        error: err => {
          this.error = "Échec de la suppression.";
        }
      });
    }
  }
 editReservation(id: number) {
  this.router.navigate(['/reservations/edit', id]);
}
}
