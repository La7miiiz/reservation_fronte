import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/services/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent implements OnInit {
  userName: string = 'Utilisateur';

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.userService.getProfile().subscribe({
      next: (user: any) => {
        this.userName = user.nom || user.username || user.email || 'Utilisateur';
      }
    });
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  logout() {
    localStorage.removeItem('salle_token');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
