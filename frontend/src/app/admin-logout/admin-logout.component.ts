import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-logout',
  standalone: true,
  imports: [],
  templateUrl: './admin-logout.component.html',
  styleUrl: './admin-logout.component.css'
})
export class AdminLogoutComponent {
  
  private router = inject(Router)

  logout() {
    localStorage.clear();
    this.router.navigate(['admin-login']);
  }
}
