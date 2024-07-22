import { Component, OnInit } from '@angular/core';
import { ApplyingFormService } from 'src/app/services/applying-form.service';

interface EWSData {
  sno: number;
  appNo: string;
  status: string;
  action: string;
  ReviewApp: string;
  date: string;
}

@Component({
  selector: 'app-officer3',
  templateUrl: './officer3.component.html',
  styleUrls: ['./officer3.component.css']
})
export class Officer3Component implements OnInit {
  data: EWSData[] = [];
  filteredData: EWSData[] = [];
  selectedService: string = 'Single Window Colony Approval';
  selectedTask: string = 'EWS Verification-Rural';
  selectedAppNo: string = '';
  selectedDate: string = '';

  constructor(private applyingFormService: ApplyingFormService) {}

  ngOnInit() {
    this.data = [
      { sno: 1, appNo: '', status: 'Initiated', ReviewApp: '', action: 'Verify', date: '' },
      { sno: 2, appNo: '', status: 'Initiated', ReviewApp: '', action: 'Verify', date: '' },
    ];
    this.filteredData = this.data; // Initialize filteredData to display all data initially
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

  setSelectedApp(item: EWSData) {
    this.applyingFormService.getApplyingFormData(item.sno).subscribe(
      data => {
        // Update the clicked item's application data with the fetched data
        item.appNo = data.applicantData.application_id; // Adjust as needed

        // Extract only the date part from the timestamp
        const createdAt = new Date(data.formFieldsData.created_at);
        const formattedDate = createdAt.toLocaleDateString('en-GB'); // Format as DD-MM-YYYY
        item.date = formattedDate; // Set the formatted date
        console.log('Fetched data:', data);

        // Update the selected values
        this.selectedAppNo = item.appNo;
        this.selectedDate = item.date;
      },
      error => {
        console.error('Error fetching application data:', error);
      }
    );
  }
}
