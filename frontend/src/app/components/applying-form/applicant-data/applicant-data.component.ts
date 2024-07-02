import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicant-data',
  templateUrl: './applicant-data.component.html',
  styleUrls: ['./applicant-data.component.css']
})
export class ApplicantDataComponent {
  districts: string[] = [
    'Balod', 'Baloda Bazar - Bhatapara', 'Balrampur - Ramanujganj', 'Bastar', 'Bemetara', 'Bijapur',
    'Bilaspur', 'Dakshin Bastar Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi',
    'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Khairagarh Chhuikhadan Gandai', 'Kondagaon', 'Korba',
    'Korea', 'Mahasamund', 'Manendragarh Chirmiri Bharatpur Mcb', 'Mohla Manpur Ambagarh Chouki', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sakti', 'Sarangarh Bilaigarh', 'Sukma', 'Surajpur', 'Surguja', 'Uttar Bastar Kanker'
  ].sort();

  selectedDistrict: string = '';

  purposes = [
    { value: 'plotted', label: 'Plotted' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'plotted_corporate', label: 'Plotted and Corporate' }
  ];

  selectedPurpose: string = '';

  applicantData: FormGroup;
  showAdditionalForm: boolean = false;
  isKhasraIntegrated: boolean = true;

  constructor(private fb: FormBuilder) {
    this.applicantData = this.fb.group({
      fullName: [''],
      LUB: [''],
      Srno: [''],
      registrationDate: [''],
      Hno: [''],
      neighbourhoodColony: [''],
      district: [''],
      surveyNumber: [''],
      area: [''],
      village: [''],
      neighbourhoodColony4: [''],
      district4: [''],
      developedLandName: [''],
      village5: [''],
      neighbourhoodColony5: [''],
      district5: [''],
      EWS: [''],
      EWSb: [''],
      CGRResidential: [''],
      CGRLand: [''],
      EWSAreaResidential: [''],
      EWSAreaLand: [''],
      CGRAmount: [''],
      relinquishment: [''],
      permitPurpose: [''],
      mobileNumber: [''],
      email: [''],
      tinGstnNumber: [''],
      clearances: this.fb.group({
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
      })
    });

    // Subscribe to changes on the EWS form control
    this.applicantData.get('EWS')!.valueChanges.subscribe(value => {
      this.onEWSChange(value);
    });
  }

  onEWSChange(value: string) {
    if (value === 'EWS-less') {
      this.applicantData.addControl('EWSb', this.fb.control(''));
    } else {
      this.applicantData.removeControl('EWSb');
    }
  }

  onSubmit() {
    console.log('Form submitted:', this.applicantData.value);
    // Implement form submission logic here
  }

  saveDraft() {
    // Implement save draft functionality if needed
  }

  onReset() {
    this.applicantData.reset();
    this.isKhasraIntegrated = true; // Reset khasra integration state
  }

  onCancel() {
    console.log('Form cancelled');
    // Implement cancellation logic if needed
  }
}
