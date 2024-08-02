import { Component, OnInit } from '@angular/core';
import { ApplyingFormService } from 'src/app/services/applying-form.service';
import { Router } from '@angular/router';
import { EWSData } from 'src/app/models/ews-data.model';

@Component({
  selector: 'app-officer3',
  templateUrl: './officer3.component.html',
  styleUrls: ['./officer3.component.css']
})
export class Officer3Component implements OnInit {
  data: EWSData[] = [];
  filteredData: EWSData[] = [];
  selectedService: string = 'Single Window Colony Approval';
  selectedTask: string = 'EWS Verification';
  selectedAppNo!: number;
  selectedDate: string = '';

  constructor(
    private applyingFormService: ApplyingFormService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.applyingFormService.getAllFormFieldsData().subscribe(
      (response: any[]) => {
        console.log('Number of items in response:', response.length);

        this.data = response.map((item: any) => ({
          sno: item.formfields_id, // Updated from 'id' to 'formfields_id'
          appNo: item.formfields_id, // Updated from 'id' to 'formfields_id'
          status: item.status || 'Initiated',
          action: item.action || 'Verify',
          ReviewApp: item.ReviewApp || 'Pull',
          date: item.created_at ? new Date(item.created_at).toLocaleDateString('en-GB') : ''
        }));

        console.log('Number of items after mapping:', this.data.length);

        this.filteredData = this.data;
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
      const fromDateParts = fromDateStr.split('-');
      const toDateParts = toDateStr.split('-');
      const fromDate = new Date(+fromDateParts[0], +fromDateParts[1] - 1, +fromDateParts[2]);
      const toDate = new Date(+toDateParts[0], +toDateParts[1] - 1, +toDateParts[2]);

      this.filteredData = this.data.filter(item => {
        const itemDateParts = item.date.split('/');
        const itemDate = new Date(+itemDateParts[2], +itemDateParts[1] - 1, +itemDateParts[0]);

        return itemDate >= fromDate && itemDate <= toDate;
      });
    } else {
      this.filteredData = this.data;
    }
  }

  setSelectedApp(item: EWSData) {
    this.applyingFormService.getApplyingFormData(item.appNo).subscribe(
      (data: { formFieldsData: any; applicantData: any }) => {
        console.log('Fetched application data:', data);

        if (data && data.formFieldsData) {
          item.appNo = data.formFieldsData.formfields_id; // Updated from 'id' to 'formfields_id'
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

          this.navigateToFormDataComponent(item.sno);
        } else {
          console.error('Form fields data not found:', data);
        }
      },
      (error) => {
        console.error('Error fetching application data:', error);
      }
    );
    console.log(item.sno);
  }

  navigateToFormDataComponent(sno: number) {
    this.router.navigate(['/form-data', sno]);
  }
}
