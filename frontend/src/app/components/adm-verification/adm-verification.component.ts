import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificationData } from 'src/app/models/verification-data.model';
import { VerificationService } from 'src/app/services/verification.service';

@Component({
  selector: 'app-adm-verification',
  templateUrl: './adm-verification.component.html',
  styleUrls: ['./adm-verification.component.css']
})
export class AdmVerificationComponent implements OnInit {
  admVerificationForm!: FormGroup;
  data: VerificationData = { serviceName: '', currentTask: '', appRefNo: '', appReceivedDate: '', action: '', official: '', remarks: '' };
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
  
    this.admVerificationForm = this.fb.group({
      action: ['', Validators.required],
      official: [false, Validators.requiredTrue],
      remarks: ['', Validators.required]
    });
  }
  
  onSubmit() {
    console.log('Submit button clicked');
    console.log('Form Submitted');
    console.log('Form value:', this.admVerificationForm.value);
    console.log('Form valid:', this.admVerificationForm.valid);
    
    if (this.admVerificationForm.valid) {
      const action = this.admVerificationForm.value.action === 'forward' ? 'Forwarded' : 'Rejected';
      const official = this.admVerificationForm.value.official ? 'Executive Engineer' : '';
      const remarks = this.admVerificationForm.value.remarks;

      const verificationData = {
        ...this.data,
        action,
        official,
        remarks
      };

      this.verificationService.setVerificationData(verificationData);

      if (action === 'Forwarded' || action === 'Rejected') {
        this.showAlert(action === 'Forwarded' ? 'Successfully Forwarded' : 'Rejected');
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