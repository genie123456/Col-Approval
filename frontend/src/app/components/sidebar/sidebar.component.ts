import { Component, AfterViewInit } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {

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
