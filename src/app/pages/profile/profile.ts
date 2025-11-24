import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user';
import { StatsService } from '../../core/services/stats';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../../shared/side-nav/side-nav';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { AvatarPickerComponent } from '../../avatar-picker/avatar-picker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SideNavComponent,
    BaseChartDirective,
    AvatarPickerComponent,
  ],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  editForm!: FormGroup;
  showEdit = false;
  showAvatarPicker = false;
  stats: any = {};
  loading = true;
  error: string | null = null;

  barChartData: ChartData<'bar'> = {
    labels: ['Utilisateurs', 'Salles', 'Réservations', 'Actives', 'Expirées'],
    datasets: [
      {
        label: 'Statistiques',
        data: [0, 0, 0, 0, 0],
        backgroundColor: '#5A9',
      },
    ],
  };
  barChartOptions: ChartOptions<'bar'> = { responsive: true };

  avatarStyle = 'thumbs';
  avatarSeed = '';

  logHistory: any[] = [];
  usersList: any[] = [];
  reservationsList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private statsService: StatsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (profile: any) => {
        this.user = profile;
        this.avatarSeed = profile.nom || profile.username || 'anonymous';

        this.editForm = this.fb.group({
          username: [profile.nom, Validators.required],
          email: [profile.email, [Validators.required, Validators.email]],
          oldPassword: [''],
          newPassword: [''],
        });

        if (profile.role === 'ADMIN') {
          this.statsService.getAdminStats().subscribe({
            next: (s: any) => {
              this.barChartData = {
                labels: ['Utilisateurs', 'Salles', 'Réservations', 'Actives', 'Expirées'],
                datasets: [
                  {
                    label: 'Statistiques',
                    data: [
                      s.users || 0,
                      s.rooms || 0,
                      s.reservations || 0,
                      s.active || 0,
                      s.expired || 0,
                    ],
                    backgroundColor: '#5A9',
                  },
                ],
              };
            },
          });

          this.userService.getLogs().subscribe({
            next: (logs: any[]) => {
              this.logHistory = logs;
            },
            error: (_) => {
              this.logHistory = [];
            },
          });

          this.userService.getAllUsers().subscribe({
            next: (users: any[]) => {
              this.usersList = users;
            },
            error: (_) => {
              this.usersList = [];
            },
          });

          this.userService.getAllReservations().subscribe({
            next: (reservations: any[]) => {
              this.reservationsList = reservations;
            },
            error: (_) => {
              this.reservationsList = [];
            },
          });
        }

        this.loading = false;
      },
      error: (_) => {
        this.error = 'Échec de chargement du profil.';
        this.loading = false;
      },
    });
  }

  openEditProfile() {
    this.showEdit = true;
  }

  cancelEdit() {
    this.showEdit = false;
  }

  saveProfile() {
    if (this.editForm && this.editForm.valid) {
      this.userService.updateProfile({
        nom: this.editForm.value.username,
        email: this.editForm.value.email,
        oldPassword: this.editForm.value.oldPassword,
        newPassword: this.editForm.value.newPassword,
        avatarSeed: this.avatarSeed,
      }).subscribe({
        next: (updated: any) => {
          this.user = updated;
          this.showEdit = false;
        },
        error: (_) => (this.error = 'Erreur lors de la mise à jour du profil.'),
      });
    }
  }

  onAvatarSelected(seed: string) {
    this.avatarSeed = seed;
    this.showAvatarPicker = false;
    this.userService.updateProfile({ ...this.user, avatarSeed: this.avatarSeed }).subscribe({
      next: (updated: any) => {
        this.user = updated;
      },
      error: () => {
        this.error = "Erreur lors de la mise à jour de l'avatar.";
      },
    });
  }

  goToEditProfile() {
    this.router.navigate(['/profile/edit']);
  }

  cancelReservation(id: number) {
    if (confirm('Voulez-vous vraiment annuler cette réservation ?')) {
      this.userService.cancelReservation(id).subscribe({
        next: () => {
          this.reservationsList = this.reservationsList.filter(r => r.id !== id);
        },
        error: () => {
          alert('Erreur lors de l\'annulation.');
        }
      });
    }
  }
}
