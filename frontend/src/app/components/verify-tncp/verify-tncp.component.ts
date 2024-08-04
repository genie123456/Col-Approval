import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificationData } from 'src/app/models/verification-data.model';
import { VerificationService } from 'src/app/services/verification.service';

@Component({
  selector: 'app-verify-tncp',
  templateUrl: './verify-tncp.component.html',
  styleUrls: ['./verify-tncp.component.css']
})
export class VerifyTNCPComponent implements OnInit {
  tncpVerificationForm!: FormGroup;
  data: VerificationData = { serviceName: '', currentTask: '', appRefNo: '', appReceivedDate: '', action: '', official: '', remarks: '' };
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private verificationService: VerificationService 
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.data.serviceName = params.get('serviceName')!;
      this.data.currentTask = params.get('currentTask')!;
      this.data.appRefNo = params.get('appRefNo')!;
      this.data.appReceivedDate = params.get('appReceivedDate')!;
    });

    this.tncpVerificationForm = this.fb.group({
      action: ['', Validators.required],
      remarks: ['', Validators.required],
      paymentDetails: ['', Validators.required],
      provisionalLayoutFee: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.tncpVerificationForm.valid) {
      const action = this.tncpVerificationForm.value.action;
      const remarks = this.tncpVerificationForm.value.remarks;
      const paymentDetails = this.tncpVerificationForm.value.paymentDetails;
      const provisionalLayoutFee = this.tncpVerificationForm.value.provisionalLayoutFee;

      this.verificationService.setVerificationData({
        ...this.data,
        action,
        remarks,
        paymentDetails,
        provisionalLayoutFee
      });

      if (action === 'forward' && remarks) {
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
