import { Component, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-sidebar-off',
  templateUrl: './sidebar-off.component.html',
  styleUrls: ['./sidebar-off.component.css']
})
export class SidebarOffComponent implements AfterViewInit, OnInit {
  loggedIn: boolean = false;
  username: string = '';
  inboxLink: string = '';
  sidebarExpanded: boolean = true;

  constructor(
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((status: boolean) => {
      this.loggedIn = status;
      if (status) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        this.username = user.username || '';
        this.cd.detectChanges(); // Trigger change detection
      }
    });

    this.authService.user$.subscribe((user) => {
      if (user) {
        this.username = user.username;
        this.cd.detectChanges(); // Trigger change detection
      }
    });

    this.setInboxLink();
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap collapse manually
    const collapseElements = document.querySelectorAll('.collapse');
    collapseElements.forEach(collapseElement => {
      new bootstrap.Collapse(collapseElement, {
        toggle: false
      });
    });
  }

  toggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
    const sidebar: HTMLElement | null = document.querySelector("#sidebar");
    if (sidebar) {
      sidebar.classList.toggle("expand");
    }
  }

  private setInboxLink(): void {
    // Get the current base route (officer1, officer2, officer3)
    const url = this.router.url;
    const baseRoute = url.split('/')[1]; // Gets the first part of the URL (officer1, officer2, officer3)
    this.inboxLink = `/${baseRoute}/inbox`;
  }
}
