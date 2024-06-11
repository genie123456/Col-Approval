import { Component, OnInit } from '@angular/core';

interface PullData {
  sno: number;
  appNo: string;
  status: string;
  action: string;
  RtP: string;
  date: string;
}

@Component({
  selector: 'app-officer1',
  templateUrl: './officer1.component.html',
  styleUrls: ['./officer1.component.css']
})
export class Officer1Component implements OnInit {
  data: PullData[] = [];
  filteredData: PullData[] = [];

  constructor() {}

  ngOnInit() {
    // Assuming you have your service data here, populate the array
    this.data = [
      { sno: 1, appNo: 'Application 1', status: 'Initiated', action: 'Pull', RtP: '', date: '2024-06-11' },
      { sno: 2, appNo: 'Application 2', status: 'Initiated', action: 'Pull', RtP: '', date: '2023-06-10' },
      // ... add more data objects as needed
    ];
    this.filteredData = this.data; // Initialize filteredData to display all data initially
  }

  filterData() {
    const fromDate = (document.getElementById('from-date') as HTMLInputElement).value;
    const toDate = (document.getElementById('to-date') as HTMLInputElement).value;

    if (fromDate && toDate) {
      this.filteredData = this.data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
      });
    } else {
      this.filteredData = this.data; // If no date filter is applied, show all data
    }
  }
}
