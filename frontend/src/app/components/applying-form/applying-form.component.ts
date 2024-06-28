import { Component, ViewChild, ViewContainerRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-applying-form',
  templateUrl: './applying-form.component.html',
  styleUrls: ['./applying-form.component.css']
})
export class ApplyingFormComponent implements OnInit {
  districts: string[] = [
    'Balod', 'Baloda Bazar - Bhatapara', 'Balrampur - Ramanujganj', 'Bastar', 'Bemetara', 'Bijapur',
    'Bilaspur', 'Dakshin Bastar Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi',
    'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Khairagarh Chhuikhadan Gandai', 'Kondagaon', 'Korba',
    'Korea', 'Mahasamund', 'Manendragarh Chirmiri Bharatpur Mcb', 'Mohla Manpur Ambagarh Chouki', 'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sakti', 'Sarangarh Bilaigarh', 'Sukma', 'Surajpur', 'Surguja', 'Uttar Bastar Kanker'
  ].sort();

  selectedDistrict: string = '';
  applyingForm: FormGroup;
  showAdditionalForm: boolean = false;
  isKhasraIntegrated: boolean = true;

  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private fb: FormBuilder) {
    this.applyingForm = this.fb.group({
      district: [''],
      area: [''],
      khasraIntegrated: [''],
      integratedKhasraNumber: [''],
      office: [''],
      body: [{ value: '', disabled: true }] // Added form control for body
    });

    this.applyingForm.get('khasraIntegrated')!.valueChanges.subscribe(value => {
      this.onKhasraIntegratedChange(value);
    });
  }

  ngOnInit(): void {
    // Subscribe to changes in the 'area' form control to show/hide the body options
    this.applyingForm.get('area')!.valueChanges.subscribe(value => {
      if (value === 'urban') {
        this.applyingForm.get('body')!.enable(); // Enable the body options
      } else {
        this.applyingForm.get('body')!.disable(); // Disable the body options for other areas
      }
    });
  }

  onKhasraIntegratedChange(value: string) {
    this.showAdditionalForm = (value === 'yes');
    this.isKhasraIntegrated = (value === 'yes');
  }

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
