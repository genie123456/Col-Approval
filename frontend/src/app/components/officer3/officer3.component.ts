import { Component, OnInit } from '@angular/core';

interface EWSdata {
  serviceName: string;
  currentTask: string;
  appRefNo: string;
  appReceivedDate: string;
}

@Component({
  selector: 'app-officer3',
  templateUrl: './officer3.component.html',
  styleUrls: ['./officer3.component.css']
})
export class Officer3Component implements OnInit {
  data: EWSdata[] = [];
  ngOnInit() {
    this.data = [
      { serviceName: 'Single Window Colony Approval', currentTask: 'EWS Verification-Rural', appRefNo: 'CGAWAAS/2024/00012', appReceivedDate: '08-04-2024' }
    ];
  }

}
