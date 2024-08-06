import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificationData } from 'src/app/models/verification-data.model';
import { VerificationService } from 'src/app/services/verification.service';
import { VPHComponent } from '../../vph/vph.component'; 


@Component({
  selector: 'app-provisional-layout',
  templateUrl: './provisional-layout.component.html',
  styleUrls: ['./provisional-layout.component.css']
})
export class ProvisionalLayoutComponent implements OnInit {
  provisionalLayoutForm!: FormGroup;
  data: VerificationData = { serviceName: '', currentTask: '', appRefNo: '', appReceivedDate: '', action: '', official: '', remarks: '' };

  @ViewChild(VPHComponent) vphComponent!: VPHComponent;  // Use ViewChild to get a reference to VPHComponent
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private verificationService: VerificationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.data.serviceName = params.get('serviceName')!;
      this.data.currentTask = params.get('currentTask')!;
      this.data.appRefNo = params.get('appRefNo')!;
      this.data.appReceivedDate = params.get('appReceivedDate')!;
    });

    this.provisionalLayoutForm = this.fb.group({
      action: ['forward', Validators.required], // Default to "Forward" action
      official: [false, Validators.requiredTrue],
      remarks: ['', Validators.required]
    });

    this.verificationService.getVerificationData().subscribe(data => {
      if (data) {
        this.receiveData(data);
      }
    });
  }

  receiveData(data: VerificationData) {
    this.vphComponent.actionDetails = data.action;
    this.vphComponent.official = data.official;
    this.vphComponent.remarks = data.remarks;
  }

  onSubmit() {
    if (this.provisionalLayoutForm.valid) {
      const action = this.provisionalLayoutForm.value.action;
      const official = this.provisionalLayoutForm.value.official;
      const remarks = this.provisionalLayoutForm.value.remarks;

      this.verificationService.setVerificationData({
        ...this.data,
        action,
        official,
        remarks
      });

      if (official && remarks) {
        this.showAlert('Successfully Forwarded');
      } else {
        console.error('Form is invalid or incomplete.');
      }
    } else {
      console.error('Form is invalid.');
    }
  }

  showAlert(message: string) {
    alert(message);
  }
}
