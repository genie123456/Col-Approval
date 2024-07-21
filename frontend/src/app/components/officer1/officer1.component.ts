import { Component, OnInit } from '@angular/core';
import { ApplyingFormService } from 'src/app/services/applying-form.service';

interface PullData {
  sno: number;
  appNo: string;
  status: string;
  action: string;
  RtP: string;
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
    // Initial data can be set here if you have a source for it, otherwise leave it empty or fetch initial data
    this.data = [
      { sno: 1, appNo: '', status: 'Initiated', action: 'Verify', RtP: '', date: '' },
      // { sno: 2, appNo: '', status: 'Initiated', action: 'Verify', RtP: '', date: '' },
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

  setSelectedApp(item: PullData) {
    // Assuming `item.sno` is the application ID, replace `1` with `item.sno`
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
