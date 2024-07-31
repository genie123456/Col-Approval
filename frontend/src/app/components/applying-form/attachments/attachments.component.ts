import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

export const ATTACHMENT_FIELDS = [
    { label: 'Layout as per CG Bhumi Vikas Niyam 1984, Development Plan\'s provisions and Zoning Regulations (Softcopy) with Khasra Superimpose', selectId: 'layout', selectFormControlName: 'layoutSelect', selectOption: 'layoutOption', inputId: 'layoutFile', formControlName: 'layout' },
    { label: 'Registration Form and declaration by Engineer/Architect for designing Layout', selectId: 'declaration', selectFormControlName: 'declarationSelect', selectOption: 'declarationOption', inputId: 'declarationFile', formControlName: 'declaration' },
    { label: 'Survey Map', selectId: 'surveyMap', selectFormControlName: 'surveyMapSelect', selectOption: 'surveyMapOption', inputId: 'surveyMapFile', formControlName: 'surveyMap' },
    { label: 'Satellite Map (from Bhuvan or any other agency)', selectId: 'satelliteMap', selectFormControlName: 'satelliteMapSelect', selectOption: 'satelliteMapOption', inputId: 'satelliteMapFile', formControlName: 'satelliteMap' },
    { label: 'Landuse Certificate', selectId: 'landUse', selectFormControlName: 'landUseSelect', selectOption: 'landUseOption', inputId: 'landUseFile', formControlName: 'landUse' },
    { label: 'Allotment letter of government lab between road and Proposed Site', selectId: 'allotLetter', selectFormControlName: 'allotLetterSelect', selectOption: 'allotLetterOption', inputId: 'allotLetterFile', formControlName: 'allotLetter' },
    { label: 'Parking Plan', selectId: 'parkingPlan', selectFormControlName: 'parkingPlanSelect', selectOption: 'parkingPlanOption', inputId: 'parkingPlanFile', formControlName: 'parkingPlan' },
    { label: 'Soil Test Report', selectId: 'soilTestReport', selectFormControlName: 'soilTestReportSelect"', selectOption: 'soilTestReportOption', inputId: 'soilTestReportFile', formControlName: 'soilTestReport' },
    { label: 'Location Map', selectId: 'locationMap', selectFormControlName: 'locationMapSelect', selectOption: 'locationMapOption', inputId: 'locationMapFile', formControlName: 'locationMap' },
    { label: 'Structural Stability report as per Rule 17', selectId: 'structuralStability', selectFormControlName: 'structuralStabilitySelect', selectOption: 'structuralStabilityOption', inputId: 'structuralStabilityFile', formControlName: 'structuralStability' },
    { label: 'Location plan of proposed EWS land (With Land Details)', selectId: 'EWSlandLocation', selectFormControlName: 'EWSlandLocationSelect', selectOption: 'EWSlandLocationOption', inputId: 'EWSlandLocationFile', formControlName: 'EWSlandLocation' },
    { label: 'Service Plan', selectId: 'servicePlan', selectFormControlName: 'servicePlanSelect', selectOption: 'servicePlanOption', inputId: 'servicePlanFile', formControlName: 'servicePlan' },
    { label: 'Partnership Deed/MOA of a Company', selectId: 'partnershipDeed', selectFormControlName: '"partnershipDeedSelect', selectOption: 'partnershipDeedOption', inputId: 'partnershipDeedFile', formControlName: 'partnershipDeed' },
    { label: 'Affidavit in prescribed format for cases in which fees is to be deposited in "Services to the poor fund" account', selectId: 'affidavitFormat', selectFormControlName: 'affidavitFormatSelect', selectOption: 'affidavitFormatOption', inputId: 'affidavitFormatFile', formControlName: 'affidavitFormat' },
    { label: 'Colonizer Registration Certificate', selectId: 'colonizerRegistration', selectFormControlName: 'colonizerRegistrationSelect', selectOption: 'colonizerRegistrationOption', inputId: 'colonizerRegistrationFile', formControlName: 'colonizerRegistration' },
    { label: 'Colonizer Net Worth for Development of Colony', selectId: 'colonizerNetWorth', selectFormControlName: 'colonizerNetWorthSelect', selectOption: 'colonizerNetWorthOption', inputId: 'colonizerNetWorthFile', formControlName: 'colonizerNetWorth' },
    { label: 'Any Other Documents', selectId: 'otherDocuments', selectFormControlName: 'otherDocumentsSelect', selectOption: '"otherDocumentsOption', inputId: 'otherDocumentsFile', formControlName: 'otherDocuments' },
    { label: 'Khasra Samviliyan-Aggregation all Khasras for colony into a single Khasra (khasra integration order)', selectId: 'KhasraSamviliyan', selectFormControlName: 'KhasraSamviliyanSelect', selectOption: 'KhasraSamviliyanOption', inputId: 'KhasraSamviliyanFile', formControlName: 'KhasraSamviliyan' },
    { label: 'Seemankan of Integrated Khasra - Signed by Tehsildar alongwith Total Station Survey', selectId: 'SeemankanIntegratedKhasra', selectFormControlName: 'SeemankanIntegratedKhasraSelect', selectOption: 'SeemankanIntegratedKhasraOption', inputId: 'SeemankanIntegratedKhasraFile', formControlName: 'SeemankanIntegratedKhasra' },
    { label: 'B1 P2 Khasra Map', selectId: 'B1P2KhasraMap', selectFormControlName: 'B1P2KhasraMapSelect', selectOption: 'B1P2KhasraMapOption', inputId: 'B1P2KhasraMapFile', formControlName: 'B1P2KhasraMap' },
    { label: 'Registry Documents Details of all khasras used to make integrated khasra if will inheritance then mutation order', selectId: 'RegistryDocuments', selectFormControlName: 'RegistryDocumentsSelect', selectOption: 'RegistryDocumentsOption', inputId: 'RegistryDocumentsFile', formControlName: 'RegistryDocuments' },
    { label: 'Panchshala Khasra of last 12 years for all khasras applied for diversion', selectId: 'PanchshalaKhasra', selectFormControlName: 'PanchshalaKhasraSelect', selectOption: 'PanchshalaKhasraOption', inputId: 'PanchshalaKhasraFile', formControlName: 'PanchshalaKhasra' },
];
@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css']
})
export class AttachmentsComponent implements OnInit {
  @Input() attachmentsForm!: FormGroup; 
  fields = ATTACHMENT_FIELDS;

  constructor() {}

  ngOnInit(): void {
    // Additional initialization logic if needed
  }

  // Function to handle file changes
  onFileChange(event: any, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.attachmentsForm.get(controlName)?.setValue(file); // <-- Update form control with the selected file
    }
  }

  // Function to submit form data
  onSubmit(): void {
    console.log('File upload functionality is now managed by the ApplyingFormComponent.');
  }
}