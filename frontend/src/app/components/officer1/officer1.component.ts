import { Component, OnInit } from '@angular/core';
import { ApplyingFormService } from 'src/app/services/applying-form.service';
import { Router } from '@angular/router';
import { PullData } from 'src/app/models/pull-data.model'; // Import the interface
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreviewModalComponent } from '../preview-modal/preview-modal.component';

@Component({
  selector: 'app-officer1',
  templateUrl: './officer1.component.html',
  styleUrls: ['./officer1.component.css']
})
export class Officer1Component implements OnInit {
  data: PullData[] = [];
  filteredData: PullData[] = [];
  selectedService: string = 'Single Window Colony Approval';
  selectedTask: string = 'ADM Verification';
  selectedAppNo!: number;
  selectedDate: string = '';
  formData: any = {}; // Add this to hold the form data for the modal

  // Add the clearanceLabels property here
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
    private router: Router,
    private modalService: NgbModal // Inject NgbModal
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.applyingFormService.getAllFormFieldsData().subscribe(
      (response: any[]) => {
        console.log('Raw API response:', response);
        console.log('Number of items in response:', response.length);
  
        this.data = response.map((item: any) => ({
          sno: item.id,
          appNo: item.id,
          status: item.status || 'Initiated',
          action: item.action || 'Verify',
          ReviewApp: item.ReviewApp || 'Pull',
          date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB') : ''
        }));
  
        console.log('Mapped data:', this.data);
        console.log('Number of items after mapping:', this.data.length);
  
        this.filteredData = this.data;
        console.log('Filtered data:', this.filteredData);
      },
      (error) => {
        console.error('Error fetching form fields data:', error);
      }
    );
  }

  filterData() {
    const fromDateStr = (document.getElementById('from-date') as HTMLInputElement).value;
    const toDateStr = (document.getElementById('to-date') as HTMLInputElement).value;

    if (fromDateStr && toDateStr) {
      // Parse the input dates from 'dd/mm/yyyy' to Date objects
      const fromDateParts = fromDateStr.split('-');
      const toDateParts = toDateStr.split('-');
      const fromDate = new Date(+fromDateParts[0], +fromDateParts[1] - 1, +fromDateParts[2]);
      const toDate = new Date(+toDateParts[0], +toDateParts[1] - 1, +toDateParts[2]);

      this.filteredData = this.data.filter(item => {
        // Parse the item.date from 'dd/mm/yyyy' to Date object
        const itemDateParts = item.date.split('/');
        const itemDate = new Date(+itemDateParts[2], +itemDateParts[1] - 1, +itemDateParts[0]);

        // Compare the dates
        return itemDate >= fromDate && itemDate <= toDate;
      });
    } else {
      this.filteredData = this.data; // If no date filter is applied, show all data
    }
  }

  setSelectedApp(item: PullData) {
    this.applyingFormService.getApplyingFormData(item.appNo).subscribe(
      (data: { formFieldsData: any; applicantData: any }) => {
        console.log('Fetched application data:', data);
  
        if (data && data.formFieldsData) {
          item.appNo = data.formFieldsData.id;
          const createdAt = new Date(data.formFieldsData.created_at);
          item.date = createdAt.toLocaleDateString('en-GB');
          console.log('Form fields data:', data.formFieldsData);
          
          if (data.applicantData) {
            console.log('Applicant data:', data.applicantData);
          } else {
            console.warn('Applicant data not found for form ID:', item.appNo);
          }
  
          this.selectedAppNo = item.appNo;
          this.selectedDate = item.date;
        } else {
          console.error('Form fields data not found:', data);
        }
      },
      (error) => {
        console.error('Error fetching application data:', error);
      }
    );
  }

  onTaskChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === 'Final Colony Development Permission') {
      this.router.navigate(['/final']);
    }
  }

  openPreviewModal(item: PullData) {
    this.applyingFormService.getApplyingFormData(item.appNo).subscribe(
      (data: { formFieldsData: any; applicantData: any }) => {
        console.log('Fetched preview data:', data);
        
        this.formData = data;
        
        // Extract and process clearances
        this.formData.filteredClearances = this.processClearances(data.formFieldsData.clearances);
  
        try {
          // Open the modal with component
          const modalRef = this.modalService.open(PreviewModalComponent, {
            ariaLabelledBy: 'modal-basic-title'
          });
  
          // Pass data to the modal component instance
          modalRef.componentInstance.data = this.formData;
  
          modalRef.result.then(
            (result) => {
              console.log('Modal closed with: ', result);
            },
            (reason) => {
              console.log('Modal dismissed with: ', reason);
            }
          );
        } catch (error) {
          console.error('Error opening modal:', error);
          alert('An error occurred while trying to open the modal. Please try again.');
        }
      },
      (error) => {
        console.error('Error fetching preview data:', error);
        alert('An error occurred while fetching preview data. Please try again.');
      }
    );
  }
  
  processClearances(clearances: any): any[] {
    // Implement the logic to filter and format clearances as needed
    return Object.keys(clearances).map(key => ({
      key,
      value: this.clearanceLabels[key] || 'Unknown'
    }));
  }
}
