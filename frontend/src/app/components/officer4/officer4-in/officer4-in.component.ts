import { Component, OnInit } from '@angular/core';

interface TNCPData {
  sno: number;
  appNo: string;
  status: string;
  action: string;
  RtP: string;
  date: string;
}
@Component({
  selector: 'app-officer4-in',
  templateUrl: './officer4-in.component.html',
  styleUrls: ['./officer4-in.component.css']
})
export class Officer4InComponent implements OnInit {
  data: TNCPData[] = [];
  filteredData: TNCPData[] = [];
  selectedService: string = 'Single Window Colony Approval';
  selectedTask: string = 'Verification by TNCP';
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

  setSelectedApp(item: TNCPData) {
    this.selectedAppNo = item.appNo;
    this.selectedDate = item.date;
  }
}
