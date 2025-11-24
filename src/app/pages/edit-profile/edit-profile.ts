import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../../shared/side-nav/side-nav';
import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  templateUrl: './edit-profile.html',
  styleUrls: ['./edit-profile.css'],
  imports: [ReactiveFormsModule, CommonModule, SideNavComponent],
})
export class EditProfileComponent implements OnInit {
  editForm!: FormGroup;
  avatarSeed: string = '';
  successMessage: string | null = null;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (user: any) => {
        this.avatarSeed = user.avatarSeed || '';
        this.editForm = this.fb.group({
          username: [user.nom, Validators.required],
          email: [user.email, [Validators.required, Validators.email]],
          oldPassword: [''],
          newPassword: ['']
        });
      },
      error: () => {
        this.error = "Impossible de charger le profil.";
      }
    });
  }

  saveProfile() {
    if (this.editForm.valid) {
      this.userService.updateProfile({
        nom: this.editForm.value.username,
        email: this.editForm.value.email,
        avatarSeed: this.avatarSeed,
        oldPassword: this.editForm.value.oldPassword,
        newPassword: this.editForm.value.newPassword
      }).subscribe({
        next: () => {
          this.successMessage = "Profil modifié avec succès !";
          this.error = null;
          setTimeout(() => {
            this.router.navigate(['/profile']);
          }, 2000);
        },
        error: () => {
          this.error = "Échec de la modification du profil.";
          this.successMessage = null;
        }
      });
    } else {
      this.error = "Veuillez remplir le formulaire correctement.";
      this.successMessage = null;
    }
  }

  cancelEdit() {
    this.router.navigate(['/profile']);
  }
}
