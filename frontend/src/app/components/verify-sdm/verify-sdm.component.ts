import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificationData } from 'src/app/models/verification-data.model';
import { VerificationService } from 'src/app/services/verification.service';

@Component({
  selector: 'app-verify-sdm',
  templateUrl: './verify-sdm.component.html',
  styleUrls: ['./verify-sdm.component.css']
})
export class VerifySDMComponent implements OnInit {
  verifySDMForm!: FormGroup;
  data: VerificationData = { serviceName: '', currentTask: '', appRefNo: '', appReceivedDate: '' };

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

    this.verifySDMForm = this.fb.group({
      action: ['forward', Validators.required], // Default to "Forward" action
      official: [false, Validators.requiredTrue],
      remarks: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.verifySDMForm.valid) {
      const action = this.verifySDMForm.value.action;
      const official = this.verifySDMForm.value.official;
      const remarks = this.verifySDMForm.value.remarks;
      
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
