import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface VerificationData {
  serviceName: string;
  currentTask: string;
  appRefNo: string;
  appReceivedDate: string;
}

@Component({
  selector: 'app-verify-tncp',
  templateUrl: './verify-tncp.component.html',
  styleUrls: ['./verify-tncp.component.css']
})
export class VerifyTNCPComponent implements OnInit {
  data: VerificationData = { serviceName: '', currentTask: '', appRefNo: '', appReceivedDate: '' };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.data.serviceName = params.get('serviceName')!;
      this.data.currentTask = params.get('currentTask')!;
      this.data.appRefNo = params.get('appRefNo')!;
      this.data.appReceivedDate = params.get('appReceivedDate')!;
    });
  }
}
