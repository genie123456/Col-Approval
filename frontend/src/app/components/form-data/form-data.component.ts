import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplyingFormService } from 'src/app/services/applying-form.service';

@Component({
  selector: 'app-form-data',
  templateUrl: './form-data.component.html',
  styleUrls: ['./form-data.component.css']
})
export class FormDataComponent implements OnInit {

  formFieldsData: any = {};
  applicantData: any = {};

  constructor(
    private applyingFormService: ApplyingFormService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      console.log('Route ID:', id);
      this.fetchFormData(id);
    });
  }

  fetchFormData(id: number) {
    this.applyingFormService.getApplyingFormData(id).subscribe(
      data => {
        console.log('Fetched data:', data);
        this.formFieldsData = data.formFieldsData || {}; // Ensure correct default value
        this.applicantData = data.applicantData || {};  // Ensure correct default value
  
        console.log('Updated formFieldsData:', this.formFieldsData);
        console.log('Updated applicantData:', this.applicantData);
  
        this.processClearanceTexts();
      },
      error => {
        console.error('Error fetching form data:', error);
      }
    );
  }
  
  processClearanceTexts(): void {
    console.log('Before processing:', this.applicantData);
    if (this.applicantData) {
      if (this.applicantData) {
        const clearanceTexts: { [key: string]: string } = {
          clearancePWD: 'PWD (Public Works Department)',
          clearanceWRD: 'WRD (Water Resources Department)',
          clearanceCSEB: 'CSEB (CG Electricity Board)',
          clearanceCECB: 'CECB (Environment)',
          clearanceNHAI: 'NHAI (National Highway)',
          clearancePHED: 'PHED (Public Health Engineering)',
          clearancePMGSY: 'PMGSY (PM Gramin Sadak Yojna)',
          clearanceFOREST: 'FOREST',
          clearanceFireNOC: 'Fire NOC (Home Department)',
          clearanceGramPanchayat: 'Gram Panchayat',
          clearanceNNNPTP: 'NN / NP / TP',
          clearanceRevenue: 'Revenue Department',
          clearanceRES: 'RES (Rural Engineering Services)',
        };
    
        Object.keys(clearanceTexts).forEach(key => {
          const clearanceValue = this.applicantData?.[key];
          if (clearanceValue !== null && clearanceValue !== undefined && clearanceTexts[key][clearanceValue.toString()]) {
            this.applicantData[key] = clearanceTexts[key][clearanceValue.toString()];
          } else {
            this.applicantData[key] = 'null';
          }
        });
      }
    }
    console.log('After processing:', this.applicantData);
  }
}
