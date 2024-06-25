import { Component, OnInit } from '@angular/core';

interface TNCPData {
  serviceName: string;
  currentTask: string;
  appRefNo: string;
  appReceivedDate: string;
}

@Component({
  selector: 'app-officer4',
  templateUrl: './officer4.component.html',
  styleUrls: ['./officer4.component.css']
})
export class Officer4Component implements OnInit {
  data: TNCPData[] = [];
  ngOnInit() {
    this.data = [
      { serviceName: 'Single Window Colony Approval', currentTask: 'Verification by TNCP', appRefNo: 'CGAWAAS/2024/00012', appReceivedDate: '08-04-2024' }
    ];
  }
}
