import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { parseJwt } from '../../core/utils/jwt-utils'; // Adjust path as needed

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent implements OnInit {
  private router = inject(Router);

  userName: string = 'Utilisateur';

  ngOnInit() {
    const token = localStorage.getItem('salle_token');
if (token) {
  const payload = parseJwt(token);
  console.log(payload); // View it in your browser's console
  // then adjust this line:
  this.userName = payload?.nom || payload?.name || payload?.username || 'Utilisateur';
}
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  logout() {
    localStorage.removeItem('salle_token');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
