import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isConnected: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
   this.isConnected = this.authService.isAuthenticatedUser();
   console.log(this.isConnected);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
