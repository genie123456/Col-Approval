import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isSignupPage(): boolean {
    return this.router.url === '/signup';
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.loggedIn = status;
  });
} 
logout(): void {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}
