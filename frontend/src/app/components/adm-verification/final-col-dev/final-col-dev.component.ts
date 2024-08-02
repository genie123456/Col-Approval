import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificationData } from 'src/app/models/verification-data.model';
import { VerificationService } from 'src/app/services/verification.service';

@Component({
  selector: 'app-final-col-dev',
  templateUrl: './final-col-dev.component.html',
  styleUrls: ['./final-col-dev.component.css']
})
export class FinalColDevComponent implements OnInit {
  finalColDevForm!: FormGroup;
  data: VerificationData = { serviceName: '', currentTask: '', appRefNo: '', appReceivedDate: '' };

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute,
    private verificationService: VerificationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.data.serviceName = params.get('serviceName')!;
      this.data.currentTask = params.get('currentTask')!;
      this.data.appRefNo = params.get('appRefNo')!;
      this.data.appReceivedDate = params.get('appReceivedDate')!;
    });

    this.finalColDevForm= this.fb.group({
      action: ['', Validators.required], 
      official: [false, Validators.requiredTrue],
      remarks: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Submit button clicked');
    console.log('Form Submitted');
    console.log('Form value:', this.finalColDevForm.value);
    console.log('Form valid:', this.finalColDevForm.valid);
    
    if (this.finalColDevForm.valid) {
      const action = this.finalColDevForm.value.action;
      const official = this.finalColDevForm.value.official;
      const remarks = this.finalColDevForm.value.remarks;
    
      this.verificationService.setVerificationData({
        ...this.data,
        action,
        remarks
      });
    
      if (action === 'approve' && official && remarks) {
        this.showAlert('Approved.');
      } else if (action === 'reject' && official && remarks) {
        this.showAlert('Rejected.');
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