import { Component, OnInit } from '@angular/core';

interface NOCData {
  sno: number;
  appNo: string;
  status: string;
  action: string;
  RtP: string;
  date: string;
}

@Component({
  selector: 'app-officer2-in',
  templateUrl: './officer2-in.component.html',
  styleUrls: ['./officer2-in.component.css']
})
export class Officer2InComponent implements OnInit {
  data: NOCData[] = [];
  filteredData: NOCData[] = [];
  selectedService: string = 'Single Window Colony Approval';
  selectedTask: string = 'NOC Application to CSEB';
  selectedAppNo: string = '';
  selectedDate: string = '';

  constructor() {}

  ngOnInit() {
    this.data = [
      { sno: 1, appNo: 'Application 1', status: 'Initiated', action: 'Verify', RtP: '', date: '2024-06-11' },
      { sno: 2, appNo: 'Application 2', status: 'Initiated', action: 'Verify', RtP: '', date: '2023-06-10' },
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

  setSelectedApp(item: NOCData) {
    this.selectedAppNo = item.appNo;
    this.selectedDate = item.date;
  }
}
