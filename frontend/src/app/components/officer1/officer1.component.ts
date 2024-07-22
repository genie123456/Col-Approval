import { Component, OnInit } from '@angular/core';
import { ApplyingFormService } from 'src/app/services/applying-form.service';
import { Router } from '@angular/router';
import { PullData } from 'src/app/models/pull-data.model'; // Import the interface

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

  constructor(private applyingFormService: ApplyingFormService, private router: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.applyingFormService.getAllFormFieldsData().subscribe(
      (response: PullData[] | any) => {
        console.log('Fetched form fields data:', response); // Log the response
  
        // Check if the response is an array or a single object
        const dataArray = Array.isArray(response) ? response : [response];
  
        this.data = dataArray.map((item, index) => ({
          sno: index + 1, // You can keep this if needed elsewhere
          appNo: item.id || '', // Assuming id is appNo
          status: item.status || 'Initiated',
          action: item.action || 'Verify',
          ReviewApp: item.ReviewApp || 'Pull',
          date: item.registrationDate ? new Date(item.registrationDate).toLocaleDateString('en-GB') : '' // Assuming registrationDate is the date field
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
    this.applyingFormService.getApplyingFormData(item.appNo).subscribe(
      (data: { formFieldsData: any; applicantData: any }) => {
        if (data && data.applicantData) {
          item.appNo = data.applicantData.application_id; // Adjust as needed
          const createdAt = new Date(data.formFieldsData.created_at);
          item.date = createdAt.toLocaleDateString('en-GB'); // Set the formatted date
          console.log('Fetched data:', data);
          this.selectedAppNo = item.appNo;
          this.selectedDate = item.date;
        } else {
          console.error('Applicant data not found:', data);
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
}
