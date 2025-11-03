import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { parseJwt } from '../../core/utils/jwt-utils';
import { SideNavComponent } from "../../shared/side-nav/side-nav"; // adjust path

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, SideNavComponent],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class ProfileComponent implements OnInit {
  private router = inject(Router);

  user: any = {};
  defaultProfilePic = 'https://ui-avatars.com/api/?name=Profil&background=346AE3&color=fff';

  ngOnInit() {
    const token = localStorage.getItem('salle_token');
    if (token) {
      const payload = parseJwt(token);
      this.user = {
        nom: payload?.nom || payload?.name || payload?.sub,
        email: payload?.email || payload?.sub,
        profilePic: '' // Add user profile image URL if you have one
      };
    }
  }

  goTo(section: string) {
    switch (section) {
      case 'reservations':
        this.router.navigateByUrl('/reservations');
        break;
      case 'profile':
        this.router.navigateByUrl('/profile');
        break;
      case 'home':
        this.router.navigateByUrl('/home');
        break;
      case 'rooms':
        this.router.navigateByUrl('/rooms');
        break;
    }
  }

  editProfile() {
    // Open edit modal or navigate to edit page
    alert('Fonction éditer le profil à implémenter !');
  }
}
