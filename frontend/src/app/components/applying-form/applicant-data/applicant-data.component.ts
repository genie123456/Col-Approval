import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  applyingForm: FormGroup;
  showAdditionalForm: boolean = false;
  isKhasraIntegrated: boolean = true;

  constructor(private fb: FormBuilder) {
    this.applyingForm = this.fb.group({
      fullName: [''],
      LUB: [''],
      Srno: [''],
      date2: [''],
      Hno: [''],
      NeiCol3: [''],
      district3: [''],
      Surveyno: [''],
      area: [''],
      village: [''],
      NeiCol4: [''],
      district4: [''],
      NameDL: [''],
      village5: [''],
      NeiCol5: [''],
      district5: [''],
      RelLR: [''],
      purpose: [''],
      MoNumber: [''],
      Email: [''],
      Firm: [''],
      EWS: [''],
      clearances: this.fb.group({
        PWD: [false],
        WRD: [false],
        CSEB: [false],
        CECB: [false],
        NHAI: [false],
        PHED: [false],
        PMGSY: [false],
        FOREST: [false],
        FireNOC: [false],
        GramPan: [false],
        NNNPTP: [false],
        Revenue: [false],
        RES: [false]
      })
    });

    // Subscribe to changes on the EWS form control
    this.applyingForm.get('EWS')!.valueChanges.subscribe(value => {
      this.onEWSChange(value);
    });
  }

  onEWSChange(value: string) {
    if (value === 'EWS-less') {
      this.applyingForm.addControl('EWSb', this.fb.control(''));
    } else {
      this.applyingForm.removeControl('EWSb');
    }
  }

  onSubmit() {
    console.log('Form submitted:', this.applyingForm.value);
    // Implement form submission logic here
  }

  saveDraft() {
    // Implement save draft functionality if needed
  }

  onReset() {
    this.applyingForm.reset();
    this.isKhasraIntegrated = true; // Reset khasra integration state
  }

  onCancel() {
    console.log('Form cancelled');
    // Implement cancellation logic if needed
  }
}
