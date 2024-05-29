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
  }

  onKhasraIntegratedChange(value: string) {
    this.showAdditionalForm = (value === 'yes');
  }
}
