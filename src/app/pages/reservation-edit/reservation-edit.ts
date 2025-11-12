import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../core/services/reservation';
import { RoomsService } from '../../core/services/rooms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reservation-edit',
  standalone: true,
  templateUrl: './reservation-edit.html',
  styleUrls: ['./reservation-edit.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ReservationEditComponent implements OnInit {
  editForm: FormGroup;
  rooms: any[] = [];
  reservationId: number = 0;
  error: string | null = null;
  success: boolean = false;
  loading: boolean = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private roomsService: RoomsService,
    private router: Router
  ) {
    this.editForm = this.fb.group({
  room: ['', Validators.required],
  date: ['', Validators.required],
  startTime: ['', Validators.required],
  endTime: ['', Validators.required],
  statut: ['', Validators.required]
});
  }

  ngOnInit() {
    // Parse the reservation ID from route params
    this.reservationId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.reservationId) {
      this.error = "Réservation inconnue.";
      this.loading = false;
      return;
    }

    // Fetch all rooms
    this.roomsService.getRooms().subscribe({
      next: rooms => this.rooms = rooms,
      error: _ => this.error = "Impossible de charger la liste des salles."
    });

    // Fetch reservation
    this.reservationService.getReservationById(this.reservationId).subscribe({
      next: (res: any) => {
        this.editForm = this.fb.group({
  room: ['', Validators.required],
  date: ['', Validators.required],
  startTime: ['', Validators.required],
  endTime: ['', Validators.required],
  statut: ['', Validators.required]
});
        this.loading = false;
      },
      error: _ => {
        this.error = "Impossible de charger cette réservation.";
        this.loading = false;
      }
    });
  }

  submit() {
    this.error = null;
    if (this.editForm.valid) {
      const { room, date, startTime, endTime, statut } = this.editForm.value;
        const payload = {
  salleId: room,
  dateDebut: `${date}T${startTime}`,
  dateFin: `${date}T${endTime}`,
  statut: statut // string in uppercase
};
      this.reservationService.updateReservation(this.reservationId, payload).subscribe({
        next: _ => {
          this.success = true;
          setTimeout(() => this.router.navigate(['/history']), 1500);
        },
        error: err => {
          this.error = "Erreur lors de la modification.";
        }
      });
    }
  }
  onCancel() {
  this.router.navigate(['/history']);
}
}
