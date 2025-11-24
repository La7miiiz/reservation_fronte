import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SideNavComponent } from '../../shared/side-nav/side-nav';
import { ReservationService } from '../../core/services/reservation';
import { RoomsService } from '../../core/services/rooms';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SideNavComponent],
  templateUrl: './reservations.html',
  styleUrls: ['./reservations.css'],
})
export class ReservationsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private reservationService = inject(ReservationService);
  private roomsService = inject(RoomsService);

  rooms: any[] = [];
  reservationForm: FormGroup = this.fb.group({
    room: ['', Validators.required],
    date: ['', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
  });

  reservationSuccess = false;
  reservationError: string | null = null;
  reservations: any[] = [];

  submitReservation() {
  this.reservationError = null;
  if (this.reservationForm.valid) {
    const { date, startTime, endTime, room } = this.reservationForm.value;
    const datetimeDebut = new Date(date + 'T' + startTime);
    const datetimeFin = new Date(date + 'T' + endTime);

    if (datetimeDebut >= datetimeFin) {
      this.reservationError = "L'heure de début doit être avant l'heure de fin !";
      return;
    }

    const selectedRoom = this.rooms.find(
      r => (r.nom || r.name) === room || r.id === room
    );
    if (!selectedRoom) {
      this.reservationError = "Salle invalide.";
      return;
    }
    const payload = {
      salleId: selectedRoom.id,
      dateDebut: date + 'T' + startTime,
      dateFin: date + 'T' + endTime
    };

    this.reservationService.createReservation(payload).subscribe({
      next: () => {
        this.reservationSuccess = true;
        setTimeout(() => (this.reservationSuccess = false), 3000);
        this.reservationForm.reset();
      },
      error: (err) => {
        if (err.error && typeof err.error === "string" && err.error.includes("déjà réservée")) {
          this.reservationError = "Cette salle est déjà réservée sur cet intervalle !";
        } else {
          this.reservationError = "Erreur lors de la réservation, veuillez réessayer.";
        }
      }
    });
  }
}



  ngOnInit() {
    this.roomsService.getRooms().subscribe(data => {
      this.rooms = data;
      this.route.queryParams.subscribe(params => {
        if (params['room']) {
          const found = this.rooms.find(r => (r.nom || r.name) === params['room']);
          if (found) {
            this.reservationForm.patchValue({ room: found.nom || found.name });
          }
        }
      });
    });
  }
}
