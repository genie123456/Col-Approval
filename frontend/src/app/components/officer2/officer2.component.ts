import { Component, OnInit } from '@angular/core';

interface NOCdata {
  serviceName: string;
  currentTask: string;
  appRefNo: string;
  appReceivedDate: string;
}

@Component({
  selector: 'app-officer2',
  templateUrl: './officer2.component.html',
  styleUrls: ['./officer2.component.css']
})
export class Officer2Component implements OnInit {
  data: NOCdata[] = [];
  ngOnInit() {
    this.data = [
      { serviceName: 'Single Window Colony Approval', currentTask: 'NOC Application to CSEB', appRefNo: 'CGAWAAS/2024/00012', appReceivedDate: '08-04-2024'},
  
    ];
  }
}
