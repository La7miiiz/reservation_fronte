import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', Validators.required],
  });

  errorMessage: string | null = null;
  successMessage: string | null = null;

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const credentials = {
      email: this.loginForm.value.email,
      motDePasse: this.loginForm.value.motDePasse,
    };

    this.auth.login(credentials).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('salle_token', res.token);
        }
        this.errorMessage = null;
        this.successMessage = "Connexion réussie !";
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigateByUrl('/');
        }, 1200); // Show success message for a moment before redirect
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Email ou mot de passe incorrect';
        this.successMessage = null;
      },
    });
  }

  goToRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
