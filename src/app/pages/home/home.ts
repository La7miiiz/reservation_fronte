import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar'; 
import { FooterComponent } from '../../shared/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  private router = inject(Router);

  goToRooms(): void {
    this.router.navigateByUrl('/rooms'); // Make sure /rooms route is defined
  }
}
