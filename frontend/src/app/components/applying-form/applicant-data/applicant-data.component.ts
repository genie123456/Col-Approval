import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApplyingFormService } from 'src/app/services/applying-form.service';

@Component({
  selector: 'app-applicant-data',
  templateUrl: './applicant-data.component.html',
  styleUrls: ['./applicant-data.component.css']
})
export class ApplicantDataComponent implements OnChanges, OnInit{
  @Input() applicantFormData!: FormGroup; 
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>(); 

  districts: string[] = [
    'Balod', 'Baloda Bazar - Bhatapara', 'Balrampur - Ramanujganj', 'Bastar', 'Bemetara', 'Bijapur',
    'Bilaspur', 'Dakshin Bastar Dantewada', 'Dhamtari', 'Durg', 'Gariaband', 'Gaurela-Pendra-Marwahi',
    'Janjgir-Champa', 'Jashpur', 'Kabirdham', 'Khairagarh Chhuikhadan Gandai', 'Kondagaon', 'Korba',
    'Korea', 'Mahasamund', 'Manendragarh Chirmiri Bharatpur Mcb', 'Mohla Manpur Ambagarh Chouki', 
    'Mungeli', 'Narayanpur', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Sakti', 'Sarangarh Bilaigarh', 
    'Sukma', 'Surajpur', 'Surguja', 'Uttar Bastar Kanker'
  ].sort();

  purposes = [
    { value: 'plotted', label: 'Plotted' },
    { value: 'corporate', label: 'Corporate' },
    { value: 'plotted_corporate', label: 'Plotted and Corporate' }
  ];

  constructor( private applyingFormService: ApplyingFormService) {}

  ngOnInit(): void {  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['applicantFormData'] && changes['applicantFormData'].currentValue) {
      this.applicantFormData = changes['applicantFormData'].currentValue;
    }
  }

  onSubmit() {
    if (this.applicantFormData.valid) {
      this.formSubmit.emit(this.applicantFormData.value); 
    }
  }

  saveDraft() {
    this.applyingFormService.saveDraft(this.applicantFormData.value).subscribe(
      response => {
        console.log('Draft saved:', response);
      },
      error => {
        console.error('Error saving draft:', error);
      }
    );
  }

  onReset() {
    this.applicantFormData.reset();
  }

  onCancel() {
    console.log('Form cancelled');
  }
}
