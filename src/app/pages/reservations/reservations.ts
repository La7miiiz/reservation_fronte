import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SideNavComponent } from '../../shared/side-nav/side-nav';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

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

  rooms = [
    { name: 'Salle A' }, { name: 'Salle B' }, { name: 'Salle C' }
  ];

  reservationForm: FormGroup = this.fb.group({
    room: ['', Validators.required],
    date: ['', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
  });
  reservationSuccess = false;
  reservations: any[] = [];

  submitReservation() {
  if (this.reservationForm.valid) {
    this.reservationSuccess = true;
    setTimeout(() => {
      this.reservationSuccess = false;
    }, 3000);
    this.reservationForm.reset();
  }
}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['room']) {
        this.reservationForm.patchValue({ room: params['room'] });
      }
    });
  }
  
}
