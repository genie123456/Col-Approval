import { Component, OnInit } from '@angular/core';
import { ApplyingFormService } from 'src/app/services/applying-form.service';

interface PullData {
  sno: number;
  appNo: string;
  status: string;
  action: string;
  ReviewApp: string;
  date: string;
}

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
  selectedAppNo: string = '';
  selectedDate: string = '';

  constructor(private applyingFormService: ApplyingFormService) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.applyingFormService.getAllFormFieldsData().subscribe(
      (response: PullData[]) => {
        this.data = response.map((item, index) => ({
          sno: index + 1,
          appNo: item.appNo || '',
          status: item.status || 'Initiated',
          action: item.action || 'Verify',
          ReviewApp: item.ReviewApp || 'Pull',
          date: item.date ? new Date(item.date).toLocaleDateString('en-GB') : ''
        }));
        this.filteredData = this.data; // Initialize filteredData to display all data initially
      },
      (error) => {
        console.error('Error fetching form fields data:', error);
      }
    );
  }

  filterData() {
    const fromDate = (document.getElementById('from-date') as HTMLInputElement).value;
    const toDate = (document.getElementById('to-date') as HTMLInputElement).value;

    if (fromDate && toDate) {
      this.filteredData = this.data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
      });
    } else {
      this.filteredData = this.data; // If no date filter is applied, show all data
    }
  }

  setSelectedApp(item: PullData) {
    this.applyingFormService.getApplyingFormData(item.sno).subscribe(
      data => {
        item.appNo = data.applicantData.application_id; // Adjust as needed
        const createdAt = new Date(data.formFieldsData.created_at);
        item.date = createdAt.toLocaleDateString('en-GB'); // Set the formatted date
        console.log('Fetched data:', data);
        this.selectedAppNo = item.appNo;
        this.selectedDate = item.date;
      },
      error => {
        console.error('Error fetching application data:', error);
      }
    );
  }
}
