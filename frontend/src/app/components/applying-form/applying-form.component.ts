import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplyingFormService } from 'src/app/services/applying-form.service';
import { AttachmentsService } from 'src/app/services/attachments.service';
import { ATTACHMENT_FIELDS } from './attachments/attachments.component'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { PreviewModalComponent } from '../preview-modal/preview-modal.component';

@Component({
  selector: 'app-applying-form',
  templateUrl: './applying-form.component.html',
  styleUrls: ['./applying-form.component.css']
})
export class ApplyingFormComponent implements OnInit {
  @ViewChild('successModal') successModal!: ElementRef;
  @ViewChild('errorModal') errorModal!: ElementRef;

  districts: string[] = [
    'Balod', 'Baloda Bazar - Bhatapara', 'Balrampur - Ramanujganj', 'Bastar', 'Bemetara', 'Bijapur',
    'Bilaspur', 'Dakshin Bastar Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi',
    'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Khairagarh Chhuikhadan Gandai', 'Kondagaon', 'Korba',
    'Korea', 'Mahasamund', 'Manendragarh Chirmiri Bharatpur Mcb', 'Mohla Manpur Ambagarh Chouki', 
    'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sakti', 'Sarangarh Bilaigarh', 
    'Sukma', 'Surajpur', 'Surguja', 'Uttar Bastar Kanker'
  ].sort();

  username: string = '';

  applyingForm: FormGroup;
  applicantFormData: FormGroup;
  attachmentsForm!: FormGroup;

  formData: any = {};

  showAdditionalForm: boolean = false;
  isKhasraIntegrated: boolean = true;

  successMessage: string = '';
  errorMessage: string = '';

  showAttachments: boolean = false;
  isAttachmentsOpened: boolean = false;
  uploadedFiles: { selectId: string; fileName: string }[] = [];

  required: string = 'This Field is Required';
  clearanceLabels: { [key: string]: string } = {
    clearancePWD: 'PWD (Public Works Department)',
    clearanceWRD: 'WRD (Water Resources Department)',
    clearanceCSEB: 'CSEB (CG Electricity Board)',
    clearanceCECB: 'CECB (Environment)',
    clearanceNHAI: 'NHAI (National Highway)',
    clearancePHED: 'PHED (Public Health Engineering)',
    clearancePMGSY: 'PMGSY (PM Gramin Sadak Yojna)',
    clearanceFOREST: 'FOREST',
    clearanceFireNOC: 'Fire NOC (Home Department)',
    clearanceGramPanchayat: 'Gram Panchayat',
    clearanceNNNPTP: 'NN / NP / TP',
    clearanceRevenue: 'Revenue Department',
    clearanceRES: 'RES (Rural Engineering Services)',
  };  

  constructor(
    private fb: FormBuilder, 
    private applyingFormService: ApplyingFormService, 
    private attachmentsService: AttachmentsService,
    private modalService: NgbModal,
    private router: Router, 
  ) {
    this.applyingForm = this.fb.group({
      selectedDistrict: ['', Validators.required],
      area: ['', [Validators.required, Validators.pattern('^(rural|urban)$')]], 
      body: [{ value: '', disabled: true }, Validators.pattern('^(Corporation|Council|Jury)?$')], 
      choosingCorporation: [''], 
      choosingCouncil: [''],
      choosingJury: [''], 
      khasraIntegrated: ['', [Validators.required, Validators.pattern('^(yes|no)$')]], 
      integratedKhasraNumber: [''], 
      office: [{ value: '', disabled: true }] 
    });

    this.applicantFormData = this.fb.group({
      fullName: [''],
      LUB: [''],
      Srno: [''],
      registrationDate: [''],
      Hno: [''],
      neighbourhoodColony: [''],
      district: ['', Validators.required],
      surveyNumber: [''],
      area: [''],
      village: [''],
      neighbourhoodColony4: [''],
      district4: ['', Validators.required],
      developedLandName: [''],
      village5: [''],
      neighbourhoodColony5: [''],
      district5: ['', Validators.required],
      relinquishment: ['', [Validators.required, Validators.pattern('^(yes|no)$')]],
      permitPurpose: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      tinGstnNumber: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{15}$')]],
      EWS: ['', [Validators.required, Validators.pattern('^(proposed layout is less than one acre|proposed layout is one acre or more)$')]],
      EWS_Less: ['', [Validators.required, Validators.pattern('^(Payment of Land|Plot)$')]],
      outside_res_area: [false],
      inside_res_area: [false],
      CGR_Residential_Area: [''],
      CGR_Land_Area: [''],
      EWS_Residential_Area: [''],
      EWS_Land_Area: [''],
      CGRAmount: [''],
      clearancePWD: [false],
      clearanceWRD: [false],
      clearanceCSEB: [false],
      clearanceCECB: [false],
      clearanceNHAI: [false],
      clearancePHED: [false],
      clearancePMGSY: [false],
      clearanceFOREST: [false],
      clearanceFireNOC: [false],
      clearanceGramPanchayat: [false],
      clearanceNNNPTP: [false],
      clearanceRevenue: [false],
      clearanceRES: [false]
    });

    this.attachmentsForm = this.fb.group({});
    ATTACHMENT_FIELDS.forEach(field => {
      this.attachmentsForm.addControl(field.formControlName, this.fb.control(null));
      this.attachmentsForm.addControl(field.selectFormControlName, this.fb.control(null, Validators.required));
    });

    // Subscribe to changes in the 'khasraIntegrated' form control to show/hide additional form fields
    this.applyingForm.get('khasraIntegrated')!.valueChanges.subscribe(value => {
      this.onKhasraIntegratedChange(value);
    });

    // Subscribe to changes in the 'selectedDistrict' form control to update the office input
    this.applyingForm.get('selectedDistrict')!.valueChanges.subscribe(district => {
      this.updateOfficeInput(district);
    });

    console.log(this.districts);  // Add this to verify the array
  }

  ngOnInit() {
    this.username = this.getUsername(); 
    this.applyingForm.get('area')!.valueChanges.subscribe(value => {
      if (value === 'urban') {
        this.applyingForm.get('body')!.enable();
      } else {
        this.applyingForm.get('body')!.disable();
      }
    });

     // This ensures Bootstrap's JavaScript is loaded
     if (typeof Modal !== 'undefined') {
      console.log('Bootstrap Modal is available');
    } else {
      console.error('Bootstrap Modal is not available');
    }
  }

  getUsername(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.username || '';
  }

  onAttachmentsButtonClick() {
    this.showAttachments = !this.showAttachments; // Toggle visibility
    this.isAttachmentsOpened = true;
  }  

  onKhasraIntegratedChange(value: string) {
    this.showAdditionalForm = (value === 'yes');
    this.isKhasraIntegrated = (value === 'yes');
  }

  updateOfficeInput(district: string) {
    const formattedDistrict = district.toUpperCase();
    const officeText = `Office of District Collectorate (DISTRICT - ${formattedDistrict}) - Rural/Urban`;
    this.applyingForm.get('office')!.setValue(officeText, { emitEvent: false });
  }

  onApplicantFormSubmit(formData: any) {
    this.applicantFormData.patchValue(formData);
    this.onSubmit();
  }

  onSubmit() {
    if (!this.isAttachmentsOpened) {
      alert('Please open the attachments section before submitting.');
      return;
    }

    if (this.isKhasraIntegrated) {
      const combinedFormData = {
        username: this.username,  // Include username
        ...this.applyingForm.value,
        office: this.applyingForm.get('office')?.value,
        applicantData: this.applicantFormData.value
      };

      this.applyingFormService.saveApplyingFormData(combinedFormData).subscribe(
        response => {
          this.submitAttachments();
          // Existing code...
        },
        error => {
          this.errorMessage = 'Error Submitting. Please check all the required Fields as they are mandatory.';
          this.successMessage = '';
          this.openErrorModal();
        }
      );
    } else {
      alert('Please get the Khasra integrated from the revenue department before applying for colony approval.');
    }
  }

  submitAttachments() {
    const hasFile = Object.keys(this.attachmentsForm.controls).some(key => {
      const control = this.attachmentsForm.get(key);
      return control && control.value instanceof File;
    });
  
    if (hasFile) {
      const formData = new FormData();
      formData.append('username', this.username);  // Include username in FormData
  
      this.uploadedFiles = [];
  
      Object.keys(this.attachmentsForm.controls).forEach(key => {
        const control = this.attachmentsForm.get(key);
        if (control && control.value) {
          formData.append(key, control.value);
  
          // Find the corresponding field from ATTACHMENT_FIELDS
          const field = ATTACHMENT_FIELDS.find(f => f.formControlName === key);
          if (field) {
            this.uploadedFiles.push({ selectId: field.selectId, fileName: control.value.name });
          }
        }
      });
  
      this.attachmentsService.uploadFiles(formData).subscribe(
        response => {
          this.successMessage = 'All data submitted successfully.';
          this.errorMessage = '';
          this.openSuccessModal();
        },
        error => {
          this.errorMessage = 'Error uploading files.';
          this.successMessage = '';
          this.openErrorModal();
        }
      );
    } else {
      this.successMessage = 'Submitted successfully (no files to upload).';
      this.openSuccessModal();
    }
  }

  openSuccessModal() {
    this.successMessage = 'Submitted successfully.';
    this.modalService.open(this.successModal, {  });
  }

  openErrorModal() {
    this.errorMessage = 'Error submitting form. Please check all the required Fields as they are mandatory.';
    this.modalService.open(this.errorModal, {  });
  }

  saveDraft() {
    const combinedFormData = {
      ...this.applyingForm.value,
      applicantData: this.applicantFormData.value
    };

    this.applyingFormService.saveDraft(combinedFormData).subscribe(
      response => {
        console.log('Draft saved:', response);
      },
      error => {
        console.error('Error saving draft:', error);
      }
    );
  }

  onReset() {
    this.applyingForm.reset();
    this.isKhasraIntegrated = true;
    this.applicantFormData.reset();
  }

  onCancel() {
    const modalRef = this.modalService.open(PreviewModalComponent);
    modalRef.result.then((result) => {
      if (result) {
        this.router.navigate(['/applicant-dashboard']);
      }
    }, (reason) => {
      // Handle dismiss, if necessary
    });
  }

  openPreviewModal() {
    console.log('openPreviewModal called');
  
    // Combine data from both forms
    this.formData = {
      formFieldsData: {
        ...this.applyingForm.value,
        office: this.applyingForm.get('office')?.value // Add this line
      },
      applicantData: this.applicantFormData.value,
      uploadedFiles: this.uploadedFiles // Include the uploaded files in formData
    };
  
    // Filter the clearances
    this.processClearanceTexts();
  
    // Open the modal
    const modalElement = document.getElementById('previewModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    } else {
      console.error('Modal element not found');
    }
  }
   

  processClearanceTexts(): void {
    if (this.formData && this.formData.applicantData) {
      // Filter only checked clearances
      this.formData.filteredClearances = Object.keys(this.clearanceLabels).filter(key => this.formData.applicantData[key]);
    }
  }
}