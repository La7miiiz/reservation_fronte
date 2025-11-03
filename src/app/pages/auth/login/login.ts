import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { FooterComponent } from '../../../shared/footer/footer';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FooterComponent],
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
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigateByUrl('/home');
        },); 
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
