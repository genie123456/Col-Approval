import { Component, OnInit } from '@angular/core';

interface PullData {
  sno: number;
  appNo: string;
  status: string;
  action: string;
  RtP: string;
}

@Component({
  selector: 'app-officer1',
  templateUrl: './officer1.component.html',
  styleUrls: ['./officer1.component.css']
})
export class Officer1Component implements OnInit {
  data: PullData[] = [];

  constructor() {}

  ngOnInit() {
    // Assuming you have your service data here, populate the array
    this.data = [
      { sno: 1, appNo: 'Application 1', status: 'Initiated', action: 'Pull', RtP: '' },
      { sno: 2, appNo: 'Application 2', status: 'Initiated', action: 'Pull', RtP: '' },
      // ... add more data objects as needed
    ];
  }
}
