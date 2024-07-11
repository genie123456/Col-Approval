import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplyingFormService } from 'src/app/services/applying-form.service';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css']
})
export class FormDataComponent implements OnInit {

  formData: any;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private applyingFormService: ApplyingFormService, private modalService: NgbModal) { }

  ngOnInit(): void {
    // Fetch the form data and initialize formData here
    const id = 2; // Replace with the actual ID you want to fetch
    this.applyingFormService.getApplyingFormData(id).subscribe(
      data => {
        this.formData = data;
        this.processClearanceTexts(); // Process clearance texts after fetching data
        console.log(this.formData); // You can now use this.formData in your template
      },
      error => {
        console.error('Error fetching form data:', error);
      }
    );
  }

  processClearanceTexts(): void {
    if (this.formData && this.formData.applicantData) {
      // Define clearance mappings with type assertion
      const clearanceTexts: { [key: string]: { [value: string]: string } } = {
        clearancePWD: {
          '1': 'PWD (Public Works Department)',
          'null': 'null'
        },
        clearanceWRD: {
          '1': 'WRD (Water Resources Department)',
          'null': 'null'
        },
        clearanceCSEB: {
          '1': 'CSEB (CG Electricity Board)',
          'null': 'null'
        },
        clearanceCECB: {
          '1': 'CECB (Environment)',
          'null': 'null'
        },
        clearanceNHAI: {
          '1': 'NHAI (National Highway)',
          'null': 'null'
        },
        clearancePHED: {
          '1': 'PHED (Public Health Engineering)',
          'null': 'null'
        },
        clearancePMGSY: {
          '1': 'PMGSY (PM Gramin Sadak Yojna)',
          'null': 'null'
        },
        clearanceFOREST: {
          '1': 'FOREST',
          'null': 'null'
        },
        clearanceFireNOC: {
          '1': 'Fire NOC (Home Department)',
          'null': 'null'
        },
        clearanceGramPanchayat: {
          '1': 'Gram Panchayat',
          'null': 'null'
        },
        clearanceNNNPTP: {
          '1': 'NN / NP / TP',
          'null': 'null'
        },
        clearanceRevenue: {
          '1': 'Revenue Department',
          'null': 'null'
        },
        clearanceRES: {
          '1': 'RES (Rural Engineering Services)',
          'null': 'null'
        },
      };

      // Process each clearance property
      Object.keys(clearanceTexts).forEach(key => {
        const clearanceValue = this.formData.applicantData?.[key];
        if (clearanceValue !== null && clearanceValue !== undefined && clearanceTexts[key][clearanceValue.toString()]) {
          this.formData.applicantData[key] = clearanceTexts[key][clearanceValue.toString()];
        } else {
          this.formData.applicantData[key] = 'null';
        }
      });
    }
  }
}
