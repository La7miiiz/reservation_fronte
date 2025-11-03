import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { FooterComponent } from '../../../../shared/footer/footer';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  public router = inject(Router); 

  registerForm: FormGroup = this.fb.group({
    nom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', [Validators.required, Validators.minLength(6)]],
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const payload = {
      nom: this.registerForm.value.nom,
      email: this.registerForm.value.email,
      motDePasse: this.registerForm.value.motDePasse,
    };

    this.auth.signup(payload).subscribe({
      next: (user) => {
        this.successMessage = "Compte créé avec succès !";
        this.errorMessage = null;
        setTimeout(() => this.router.navigateByUrl('/login'), 1500); 
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Erreur lors de la création du compte.';
        this.successMessage = null;
      }
    });
  }
    goToLogin(): void {
  this.router.navigateByUrl('/login');
}
  }

