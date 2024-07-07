import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplyingFormService } from 'src/app/services/applying-form.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; 

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

  applyingForm: FormGroup;
  applicantFormData: FormGroup;

  showAdditionalForm: boolean = false;
  isKhasraIntegrated: boolean = true;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private applyingFormService: ApplyingFormService, private modalService: NgbModal) {
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
      EWSLess: ['', [Validators.required, Validators.pattern('^(Payment of Land|Plot)$')]],
      outside_res_area: [false],
      inside_res_area: [false],
      CGR_Residential_Area: [''],
      CGR_Land_Area: [''],
      EWS_Residential_Area: [''],
      EWS_Land_Area: [''],
      CGRAmount: [''],
      // clearances: this.fb.group({
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
      // })
    });

    // Subscribe to changes in the 'khasraIntegrated' form control to show/hide additional form fields
    this.applyingForm.get('khasraIntegrated')!.valueChanges.subscribe(value => {
      this.onKhasraIntegratedChange(value);
    });

    // Subscribe to changes in the 'selectedDistrict' form control to update the office input
    this.applyingForm.get('selectedDistrict')!.valueChanges.subscribe(district => {
      this.updateOfficeInput(district);
    });
  }

  ngOnInit(): void {
    this.applyingForm.get('area')!.valueChanges.subscribe(value => {
      if (value === 'urban') {
        this.applyingForm.get('body')!.enable();
      } else {
        this.applyingForm.get('body')!.disable();
      }
    });
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
    if (this.isKhasraIntegrated) {
      const combinedFormData = {
        ...this.applyingForm.value,
        office: this.applyingForm.get('office')?.value,
        applicantData: this.applicantFormData.value
      };

      this.applyingFormService.saveApplyingFormData(combinedFormData).subscribe(
        response => {
          this.successMessage = 'Form submitted successfully.';
          this.errorMessage = '';
          this.openSuccessModal();
        },
        error => {
          this.errorMessage = 'Error submitting form.';
          this.successMessage = '';
          this.openErrorModal();
        }
      );
    } else {
      alert('Please get the Khasra integrated from the revenue department before applying for colony approval.');
    }
  }

  openSuccessModal() {
    this.successMessage = 'Form submitted successfully.';
    this.modalService.open(this.successModal, {  });
  }

  openErrorModal() {
    this.errorMessage = 'Error submitting form.';
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
    console.log('Form cancelled');
  }
}
