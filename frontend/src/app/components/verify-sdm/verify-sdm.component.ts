import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerificationData } from 'src/app/models/verification-data.model';

@Component({
  selector: 'app-verify-sdm',
  templateUrl: './verify-sdm.component.html',
  styleUrls: ['./verify-sdm.component.css']
})
export class VerifySDMComponent implements OnInit {
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
