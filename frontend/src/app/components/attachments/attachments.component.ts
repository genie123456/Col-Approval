import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {
  attachmentsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.attachmentsForm = this.fb.group({
      // layout: [null, Validators.required],
      // declaration: [null, Validators.required],
      // surveyMap: [null, Validators.required],
      // satelliteMap: [null, Validators.required],
      // landUse: [null, Validators.required],
      // allotLetter: [null, Validators.required],
      // parkingPlan: [null, Validators.required],
      // soilTestReport: [null, Validators.required],
      // locationMap: [null, Validators.required],
      // structuralStability: [null, Validators.required],
      // EWSlandLocation: [null, Validators.required],
      // servicePlan: [null, Validators.required],
      // partnershipDeed: [null, Validators.required],
      // affidavitFormat: [null, Validators.required],
      // colonizerRegistration: [null, Validators.required],
      // colonizerNetWorth: [null, Validators.required],
      // otherDocuments: [null],
      // KhasraSamviliyan: [null, Validators.required],
      // SeemankanIntegratedKhasra: [null, Validators.required],
      // B1P2KhasraMap: [null, Validators.required],
      // RegistryDocuments: [null, Validators.required],
      // PanchshalaKhasra: [null, Validators.required],

      layoutSelect: ['', Validators.required],
      declarationSelect: ['', Validators.required],
      surveyMapSelect: ['', Validators.required],
      satelliteMapSelect: ['', Validators.required],
      landUseSelect: ['', Validators.required],
      allotLetterSelect: ['', Validators.required],
      parkingPlanSelect: ['', Validators.required],
      soilTestReportSelect: ['', Validators.required],
      locationMapSelect: ['', Validators.required],
      structuralStabilitySelect: ['', Validators.required],
      EWSlandLocationSelect: ['', Validators.required],
      servicePlanSelect: ['', Validators.required],
      partnershipDeedSelect: ['', Validators.required],
      affidavitFormatSelect: ['', Validators.required],
      colonizerRegistrationSelect: ['', Validators.required],
      colonizerNetWorthSelect: ['', Validators.required],
      otherDocumentsSelect: [null],
      KhasraSamviliyanSelect: ['', Validators.required],
      SeemankanIntegratedKhasraSelect: ['', Validators.required],
      B1P2KhasraMapSelect: ['', Validators.required],
      RegistryDocumentsSelect: ['', Validators.required],
      PanchshalaKhasraSelect: ['', Validators.required],
    }); 
  }

  ngOnInit(): void {
    // Additional initialization logic if needed
  }

 // Function to handle file changes
 onFileChange(event: any, controlName: string): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const file = input.files[0];
    this.attachmentsForm.get(controlName)?.setValue(file);
  }
}

// Function to check if an option is selected in each select element
isOptionSelected(controlName: string): boolean {
  const value = this.attachmentsForm.get(controlName)?.value;
  return value !== null && value !== '';
}

  // Function to submit form data
  onSubmit(): void {
    if (this.attachmentsForm.valid) {
      const formData = new FormData();
      // Append each file to FormData
      Object.keys(this.attachmentsForm.controls).forEach(key => {
        const control = this.attachmentsForm.get(key);
        if (control && control.value) {
          formData.append(key, control.value);
        }
      });

      // Example: Call your service method to post formData to backend
      // this.yourService.uploadFiles(formData).subscribe(response => {
      //   // Handle response as needed
      // }, error => {
      //   // Handle error as needed
      // });

      // Reset form after submission if needed
      this.attachmentsForm.reset();
    } else {
      // Form is invalid, handle validation errors
    }
  }
}
