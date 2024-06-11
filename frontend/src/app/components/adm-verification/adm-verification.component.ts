import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface verificationData {
  serviceName: string;
  currentTask: string;
  appRefNo: string;
  appReceivedDate: string;
}

@Component({
  selector: 'app-adm-verification',
  templateUrl: './adm-verification.component.html',
  styleUrls: ['./adm-verification.component.css']
})
export class AdmVerificationComponent implements OnInit {
  action!: string;
  data: verificationData[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.action = params.get('action')!;   // You can now use this.action to fetch data or perform other actions
    });
    this.data = [
      { serviceName: 'Single Window Colony Approval', currentTask: 'ADM Verification', appRefNo: 'CGAWAAS/2024/00012', appReceivedDate: '08-04-2024' }
    ];
  }
}
