import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetails } from 'src/app/models/task-details.model';
import { ApplicationDetails } from 'src/app/models/application-details.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vph',
  templateUrl: './vph.component.html',
  styleUrls: ['./vph.component.css'],
  providers: [DatePipe] // Add DatePipe to the providers
})
export class VPHComponent implements OnInit {
  applicationDetails: ApplicationDetails = {
    referenceNumber: '',
    appliedDate: '',
    dueDate: ''
  };

  taskDetails: TaskDetails[] = [
    { taskName: 'EWS Verification', user: 'SDM', receivedDate: '', processedDate: '', actionDetails: '' },
    { taskName: 'Verification by TNCP', user: 'Deputy Director', receivedDate: '', processedDate: '', actionDetails: '' },
    { taskName: 'NOC Application to CSEB', user: 'Executive Engineer', receivedDate: '', processedDate: '', actionDetails: '' },
    { taskName: 'ADM Verification', user: 'ADM', receivedDate: '', processedDate: '', actionDetails: '' },
    { taskName: 'Application Submission', user: 'Citizen', receivedDate: 'NA', processedDate: '', actionDetails: 'Completed' }
  ];

  constructor(private route: ActivatedRoute, private datePipe: DatePipe) {} // Inject DatePipe

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const appReceivedDate = params.get('appReceivedDate')!;
      const appNo = Number(params.get('appRefNo')!);
  
      console.log(`AppNo: ${appNo}`);  // Add this line to log the application number
  
      this.applicationDetails = {
        referenceNumber: params.get('appRefNo')!,
        appliedDate: appReceivedDate,
        dueDate: appReceivedDate
      };
      
      // Correctly parse the date in DD/MM/YYYY format
      const [day, month, year] = appReceivedDate.split('/').map(Number);
      const parsedDate = new Date(year, month - 1, day);

      // Set the processedDate for the task where user is 'Citizen'
      const submissionTask = this.taskDetails.find(task => task.user === 'Citizen');
      if (submissionTask) {
        const formattedDate = this.datePipe.transform(parsedDate, 'dd/MM/yyyy');
        // Log the formatted date
        submissionTask.processedDate = formattedDate!;
      }
    });
  }
}
