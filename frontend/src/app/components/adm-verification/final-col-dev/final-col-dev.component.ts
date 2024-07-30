import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerificationData } from 'src/app/models/verification-data.model';

@Component({
  selector: 'app-final-col-dev',
  templateUrl: './final-col-dev.component.html',
  styleUrls: ['./final-col-dev.component.css']
})
export class FinalColDevComponent implements OnInit {
  finalColDevForm!: FormGroup;
  data: VerificationData = { serviceName: '', currentTask: '', appRefNo: '', appReceivedDate: '' };

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.data.serviceName = params.get('serviceName')!;
      this.data.currentTask = params.get('currentTask')!;
      this.data.appRefNo = params.get('appRefNo')!;
      this.data.appReceivedDate = params.get('appReceivedDate')!;
    });
    
    this.finalColDevForm = this.fb.group({
      decision: ['', Validators.required],
      remarks: ['']
    });
  }

  onSubmit() {
    if (this.finalColDevForm.valid) {
      const decision = this.finalColDevForm.get('decision')?.value;
      if (decision === 'approve') {
        alert('Verification and Approval Complete. Sending updated status to the Applicant.');
      } else if (decision === 'reject') {
        alert('Rejecting the Approval process. Sending updated status to the Applicant.');
      }
      console.log(this.finalColDevForm.value);
    }
  }

  onReset() {
    this.finalColDevForm.reset();
  }

  onCancel() {
    // Handle cancel
  }
}
