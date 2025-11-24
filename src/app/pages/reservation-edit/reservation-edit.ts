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
  isAdmin = false; 

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
      statut: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.reservationId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.reservationId) {
      this.error = "Réservation inconnue.";
      this.loading = false;
      return;
    }

    this.roomsService.getRooms().subscribe({
  next: (rooms: any[]) => this.rooms = rooms,
  error: (_: any) => this.error = "Impossible de charger la liste des salles."
});

    this.reservationService.getReservationById(this.reservationId).subscribe({
      next: (res: any) => {
        this.editForm.patchValue({
          room: res.salle?.id || res.salleId || '',
          date: res.dateDebut?.substring(0, 10) || '',
          startTime: res.dateDebut?.substring(11, 16) || '',
          endTime: res.dateFin?.substring(11, 16) || '',
          statut: res.statut || ''
        });
        this.loading = false;
      },
      error: (_: any) => {
        this.error = "Impossible de charger cette réservation.";
        this.loading = false;
      }
    });
  }

  submit() {
    this.error = null;
    if (this.editForm.valid) {
      const { room, date, startTime, endTime, statut } = this.editForm.value;
      const payload: any = {
        salleId: room,
        dateDebut: `${date}T${startTime}`,
        dateFin: `${date}T${endTime}`
      };
      if (this.isAdmin) {
        payload.statut = statut;
      }
      this.reservationService.updateReservation(this.reservationId, payload).subscribe({
        next: _ => {
          this.success = true;
          setTimeout(() => this.router.navigate(['/history']), 1500);
        },
       error: (err: any) => {
  this.error = "Erreur lors de la modification.";
}

      });
    }
  }

  onCancel() {
    this.router.navigate(['/history']);
  }
}
