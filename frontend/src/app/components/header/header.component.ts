import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  username: string = '';

  constructor(private router: Router, private authService: AuthService, private cd: ChangeDetectorRef) { }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isSignupPage(): boolean {
    return this.router.url === '/signup';
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.loggedIn = status;
      if (status) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        this.username = user.username || '';
        this.cd.detectChanges();  // Trigger change detection
      }
    });
  
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.username = user.username;
        this.cd.detectChanges();  // Trigger change detection
      }
    });
  }
  

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
