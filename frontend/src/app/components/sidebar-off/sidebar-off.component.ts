import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

declare var bootstrap: any;

@Component({
  selector: 'app-sidebar-off',
  templateUrl: './sidebar-off.component.html',
  styleUrls: ['./sidebar-off.component.css']
})
export class SidebarOffComponent implements AfterViewInit, OnInit{
  loggedIn: boolean = false;
  username: string = '';

  constructor(private authService: AuthService, private cd: ChangeDetectorRef) { }

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

  ngAfterViewInit(): void {
    const hamBurger: HTMLElement | null = document.querySelector(".toggle-btn");

    if (hamBurger) {
      hamBurger.addEventListener("click", () => {
        const sidebar: HTMLElement | null = document.querySelector("#sidebar");
        if (sidebar) {
          sidebar.classList.toggle("expand");
        }
      });
    }

    // Manually initialize Bootstrap collapse
    const collapseElements = document.querySelectorAll('.collapse');
    collapseElements.forEach(collapseElement => {
      new bootstrap.Collapse(collapseElement, {
        toggle: false
      });
    });
  }
}
