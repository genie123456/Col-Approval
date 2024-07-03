import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplyingFormService } from 'src/app/services/applying-form.service';

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
    'Korea', 'Mahasamund', 'Manendragarh Chirmiri Bharatpur Mcb', 'Mohla Manpur Ambagarh Chouki', 
    'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sakti', 'Sarangarh Bilaigarh', 
    'Sukma', 'Surajpur', 'Surguja', 'Uttar Bastar Kanker'
  ].sort();

  applyingForm: FormGroup;
  showAdditionalForm: boolean = false;
  isKhasraIntegrated: boolean = true;

  constructor(private fb: FormBuilder, private applyingFormService: ApplyingFormService) {
    this.applyingForm = this.fb.group({
      selectedDistrict: ['', Validators.required], // form control for selected district
      area: ['', Validators.required], // form control for area
      body: [{ value: '', disabled: true }], // form control for body
      choosingCorporation: [''], // form control for choosing corporation
      choosingCouncil: [''], // form control for choosing council
      choosingJury: [''], // form control for choosing jury
      khasraIntegrated: ['', Validators.required], // form control for khasra integration
      integratedKhasraNumber: [''], // form control for integrated khasra number
      office: ['', Validators.required] // form control for office
    });

    // Subscribe to changes in the 'khasraIntegrated' form control to show/hide additional form fields
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
      this.applyingFormService.saveApplyingFormData(this.applyingForm.value).subscribe(
        response => {
          console.log('Form submitted:', response);
        },
        error => {
          console.error('Error submitting form:', error);
        }
      );
    } else {
      alert('Please get it integrated from the revenue department before applying for colony approval.');
    }
  }

  saveDraft() {
    this.applyingFormService.saveDraft(this.applyingForm.value).subscribe(
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
  }

  onCancel() {
    console.log('Form cancelled');
  }
}
