import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-applying-form',
  templateUrl: './applying-form.component.html',
  styleUrls: ['./applying-form.component.css']
})
export class ApplyingFormComponent {
  applyingForm: FormGroup;
  showAdditionalForm: boolean = false;
  isKhasraIntegrated: boolean = true; // Track the state of khasra integration
  naam: boolean = true; // Track the state

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
      Monumber: [''],
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
  }

  onKhasraIntegratedChange(value: string) {
    this.showAdditionalForm = (value === 'yes');
    this.isKhasraIntegrated = (value === 'yes');
  }

  onSubmit() {
    if (this.isKhasraIntegrated) {
      // Handle submit action
      console.log('Form submitted:', this.applyingForm.value);
    } else {
      alert('Please get it integrated from the revenue department before applying for colony approval.');
    }
  }

  saveDraft() {
    // Implement save draft functionality
  }

  onReset() {
    // Reset the form
    this.applyingForm.reset();
    this.isKhasraIntegrated = true;
  }

  onCancel() {
    // Handle cancel action
    console.log('Form cancelled');
  }
}
