import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user';
import { StatsService } from '../../core/services/stats';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  user: any = {};
  editForm: FormGroup;
  showEdit = false;
  stats: any = {};
  loading = true;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private statsService: StatsService,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      oldPassword: [''],
      newPassword: ['']
      // Add name, etc if needed
    });
  }

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (profile: any) => {
        this.user = profile;
        this.editForm.patchValue({
          username: profile.username,
          email: profile.email
        });
        if (this.user.role === 'ADMIN') {
          this.statsService.getAdminStats().subscribe({
            next: (s: any) => this.stats = s
          });
        }
        this.loading = false;
      },
      error: (_: any) => {
        this.error = "Échec de chargement du profil.";
        this.loading = false;
      }
    });
  }

  openEditProfile() { this.showEdit = true; }
  cancelEdit() { this.showEdit = false; }

  saveProfile() {
    if (this.editForm.valid) {
      this.userService.updateProfile(this.editForm.value).subscribe({
        next: (updated: any) => {
          this.user = updated;
          this.showEdit = false;
        },
        error: (_: any) => this.error = "Erreur lors de la mise à jour du profil."
      });
    }
  }
}
