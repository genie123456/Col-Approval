import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApplicantDataComponent } from './applicant-data/applicant-data.component';

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
  applyingForm: FormGroup;
  showAdditionalForm: boolean = false;
  isKhasraIntegrated: boolean = true;

  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(
    private fb: FormBuilder
  ) {
    this.applyingForm = this.fb.group({
      district: [''],
      area: [''],
      khasraIntegrated: [''],
      integratedKhasraNumber: [''],
      office: [''],
    });

    this.applyingForm.get('khasraIntegrated')!.valueChanges.subscribe(value => {
      this.onKhasraIntegratedChange(value);
    });
  }

  onKhasraIntegratedChange(value: string) {
    this.showAdditionalForm = (value === 'yes');
    this.isKhasraIntegrated = (value === 'yes');
    // if (value === 'yes') {
    //   this.loadApplicantDataComponent();
    // } else {
    //   this.container.clear();
    // }
  }

  // loadApplicantDataComponent() {
  //   this.container.clear();
  //   this.container.createComponent(ApplicantDataComponent);
  // }

  onSubmit() {
    if (this.isKhasraIntegrated) {
      console.log('Form submitted:', this.applyingForm.value);
    } else {
      alert('Please get it integrated from the revenue department before applying for colony approval.');
    }
  }

  saveDraft() {}

  onReset() {
    this.applyingForm.reset();
    this.isKhasraIntegrated = true;
  }

  onCancel() {
    console.log('Form cancelled');
  }
}
