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

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    const credentials = {
      email: this.loginForm.value.email,
      motDePasse: this.loginForm.value.motDePasse,
    };

    this.auth.login(credentials).subscribe({
      next: (res) => {
        console.log('✅ Login successful', res);

        if (res.token) {
          localStorage.setItem('salle_token', res.token);
        }

        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.error('❌ Login failed', err);
      },
    });
  }
}
