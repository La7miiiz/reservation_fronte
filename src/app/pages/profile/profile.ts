import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/footer/footer';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css'],
})
export class ProfileComponent implements OnInit {
  user: any = {};

  ngOnInit() {
    // Example: Load user info from localStorage or call a user API/service
    this.user = {
      nom: localStorage.getItem('user_name') || 'Utilisateur',
      email: localStorage.getItem('user_email') || 'Not set'
      // Add other properties as needed
    };
  }

  // Optionally, add navigation or editing functionality
}
