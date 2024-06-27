import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-applying-form',
  templateUrl: './applying-form.component.html',
  styleUrls: ['./applying-form.component.css']
})
export class ApplyingFormComponent {
  districts: string[] = [
    'Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara', 'Bijapur',
    'Bilaspur', 'Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi',
    'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Kanker', 'Kondagaon', 'Korba',
    'Koriya', 'Mahasamund', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur',
    'Rajnandgaon', 'Sukma', 'Surajpur', 'Surguja'
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
      district: [''],
      area: [''],
      khasraIntegrated: [''],
      integratedKhasraNumber: [''],
      fullName: [''],
      LUB: [''],
      Srno: [''],
      date2: [''],
      Hno: [''],
      NeiCol3: [''],
      district3: [''],
      Surveyno: [''],
      areaDetails: [''],
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
      office: [''],
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

    // Subscribe to changes on the khasraIntegrated form control
    this.applyingForm.get('khasraIntegrated')!.valueChanges.subscribe(value => {
      this.onKhasraIntegratedChange(value);
    });

    // Subscribe to changes on the EWS form control
    this.applyingForm.get('EWS')!.valueChanges.subscribe(value => {
      this.onEWSChange(value);
    });
  }

  onKhasraIntegratedChange(value: string) {
    this.showAdditionalForm = (value === 'yes');
    this.isKhasraIntegrated = (value === 'yes');
  }

  onEWSChange(value: string) {
    if (value === 'EWS-less') {
      this.applyingForm.addControl('EWSb', this.fb.control(''));
    } else {
      this.applyingForm.removeControl('EWSb');
    }
  }

  onSubmit() {
    if (this.isKhasraIntegrated) {
      console.log('Form submitted:', this.applyingForm.value);
      // Implement form submission logic here
    } else {
      alert('Please get it integrated from the revenue department before applying for colony approval.');
    }
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
