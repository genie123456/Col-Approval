import { Component, OnInit } from '@angular/core';
import { OfficialsService } from 'src/app/services/officials.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  officialsData: any[] = [];

  constructor(private officialsService: OfficialsService) { }

  ngOnInit(): void {
    this.loadOfficialsData();
  }

  loadOfficialsData(): void {
    this.officialsService.getOfficials().subscribe(
      data => {
        this.officialsData = data;
      },
      error => {
        console.error('Error fetching officials data:', error);
      }
    );
  }
}