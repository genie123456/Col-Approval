import { Component, OnInit } from '@angular/core';

interface ServiceData {
  sno: number;
  serviceName: string;
  departmentName: string;
  state: string;
}

@Component({
  selector: 'app-applicant-dash-table',
  templateUrl: './applicant-dash-table.component.html',
  styleUrls: ['./applicant-dash-table.component.css']
})
export class ApplicantDashTableComponent implements OnInit {
  data: ServiceData[] = [];

  constructor() {}

  ngOnInit() {
    // Assuming you have your service data here, populate the array
    this.data = [
      { sno: 1, serviceName: 'Single Window Colony Approval', departmentName: 'Housing and Environment Department', state: 'Chhattisgarh' },
      // ... add more data objects as needed
    ];
  }
}
