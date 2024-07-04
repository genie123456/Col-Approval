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

  selectedDistrict: string = '';
  applyingForm: FormGroup;
  showAdditionalForm: boolean = false;
  isKhasraIntegrated: boolean = true;
  applicantFormData: any = {}; // Property to store applicant form data

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private applyingFormService: ApplyingFormService) {
    this.applyingForm = this.fb.group({
      selectedDistrict: ['', Validators.required], // form control for selected district
      area: ['', [Validators.required, Validators.pattern('^(rural|urban)$')]], // form control for area with specific values
      body: [{ value: '', disabled: true }, Validators.pattern('^(Corporation|Council|Jury)?$')], // form control for body with specific values
      choosingCorporation: [''], // form control for choosing corporation
      choosingCouncil: [''], // form control for choosing council
      choosingJury: [''], // form control for choosing jury
      khasraIntegrated: ['', [Validators.required, Validators.pattern('^(yes|no)$')]], // form control for khasra integration with specific values
      integratedKhasraNumber: [''], // form control for integrated khasra number
      office: [{ value: '', disabled: true }] // form control for office
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

  updateOfficeInput(district: string) {
    const formattedDistrict = district.toUpperCase();
    const officeText = `Office of District Collectorate (DISTRICT - ${formattedDistrict}) - Rural/Urban`;
    this.applyingForm.get('office')!.setValue(officeText, { emitEvent: false });
  }

  onApplicantFormSubmit(formData: any) {
    this.applicantFormData = formData;
    this.onSubmit();
  }

  onSubmit() {
    if (this.isKhasraIntegrated) {
      const combinedFormData = {
        ...this.applyingForm.value,
        office: this.applyingForm.get('office')?.value, // Ensure 'office' is included
        applicantData: this.applicantFormData
      };
  
      console.log('Form data before submission:', combinedFormData); // Debug line
  
      this.applyingFormService.saveApplyingFormData(combinedFormData).subscribe(
        response => {
          this.successMessage = 'Form submitted successfully';
          this.errorMessage = null; // Clear any previous error message
          console.log('Form submitted:', response);
        },
        error => {
          this.errorMessage = 'Error submitting form.';
          this.successMessage = null; // Clear any previous success message
          console.error('Error submitting form:', error);
        }
      );
    } else {
      alert('Please get the Khasra integrated from the revenue department before applying for colony approval.');
    }
  }

  saveDraft() {
    const combinedFormData = {
      ...this.applyingForm.value,
      applicantData: this.applicantFormData
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
    this.applicantFormData = {};
  }

  onCancel() {
    console.log('Form cancelled');
  }
}
