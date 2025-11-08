import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-nav.html',
  styleUrls: ['./side-nav.css'],
})
export class SideNavComponent {
  private router = inject(Router);

  goTo(section: string) {
    switch (section) {
      case 'history': this.router.navigateByUrl('/history'); break;
      case 'profile': this.router.navigateByUrl('/profile'); break;
      case 'home': this.router.navigateByUrl('/home'); break;
      case 'rooms': this.router.navigateByUrl('/rooms'); break;
    }
  }
  logout() {
  localStorage.removeItem('salle_token');
  localStorage.removeItem('user_name');
  this.router.navigate(['/login'], { replaceUrl: true });
}
}
