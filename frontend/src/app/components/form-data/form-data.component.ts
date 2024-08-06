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
  clearanceLabels: { [key: string]: string } = {
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

  constructor(
    private applyingFormService: ApplyingFormService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      console.log('Route ID:', id);
      this.fetchJoinedFormData(id);
    });
  }

  fetchJoinedFormData(id: number) {
    this.applyingFormService.getJoinedFormFieldsDataById(id).subscribe(
      data => {
        console.log('Fetched data:', data);
        this.formFieldsData = data.formFieldsData || {};
        this.applicantData = data.applicantData || {};
  
        // console.log('Updated formFieldsData:', this.formFieldsData);
        // console.log('Updated applicantData:', this.applicantData);
        this.processClearanceTexts();
      },
      error => {
        console.error('Error fetching form data:', error);
      }
    );
  }  
    
  processClearanceTexts(): void {
    // console.log('Before processing:', this.applicantData);
    if (this.applicantData) {
      // Filter only checked clearances
      this.applicantData.filteredClearances = Object.keys(this.clearanceLabels).filter(key => this.applicantData[key]);
    }
    // console.log('After processing:', this.applicantData);
  }
}
