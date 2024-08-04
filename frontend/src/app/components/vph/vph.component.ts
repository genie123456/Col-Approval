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

  actionDetails: string = '';
official: string = '';
remarks: string = '';

  taskDetails: TaskDetails[] = [
    { taskName: 'Verification by TNCP', user: 'Deputy Director', receivedDate: '', processedDate: '', actionDetails: 'Waiting to be pulled' },
    { taskName: 'EWS Verification', user: 'SDM', receivedDate: '', processedDate: '', actionDetails: 'Waiting to be pulled' },
    { taskName: 'NOC Application to CSEB', user: 'Executive Engineer', receivedDate: '', processedDate: '', actionDetails: 'Waiting to be pulled' },
    { taskName: 'ADM Verification', user: 'ADM', receivedDate: '', processedDate: '', actionDetails: 'Waiting to be pulled' },
    { taskName: 'Application Submission', user: 'Citizen', receivedDate: '', processedDate: '', actionDetails: 'Completed' }
  ];

  constructor(private route: ActivatedRoute, private datePipe: DatePipe) {} 

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const appReceivedDate = params.get('appReceivedDate')!;
      const appNo = Number(params.get('appRefNo')!);
      const currentTask = params.get('currentTask')!;
  
      console.log(`AppNo: ${appNo}`);  // Add this line to log the application number
      console.log(`Current Task: ${currentTask}`);  // Add this line to log the current task
  
      this.applicationDetails = {
        referenceNumber: params.get('appRefNo')!,
        appliedDate: appReceivedDate,
        dueDate: appReceivedDate
      };
      
      // Correctly parse the date in DD/MM/YYYY format
      const [day, month, year] = appReceivedDate.split('/').map(Number);
      const parsedDate = new Date(year, month - 1, day);

      // Set the receivedDate for all tasks except 'Application Submission'
      this.taskDetails.forEach(task => {
        
          const formattedDate = this.datePipe.transform(parsedDate, 'dd/MM/yyyy');
          task.receivedDate = formattedDate!;
        
      });

      // Set the processedDate for the task where user is 'Citizen'
      const submissionTask = this.taskDetails.find(task => task.user === 'Citizen');
      if (submissionTask) {
        const formattedDate = this.datePipe.transform(parsedDate, 'dd/MM/yyyy');
        submissionTask.processedDate = formattedDate!;
      }

      // Update actionDetails based on the current task
      this.updateActionDetails(currentTask);
    });
  }

  updateActionDetails(currentTask: string) {
    this.taskDetails.forEach(task => {
      if (task.user === 'Citizen') return;

      switch (currentTask) {
        case 'ADM Verification':
          if (task.user === 'ADM') {
            task.actionDetails = this.actionDetails;
          } else {
            task.actionDetails = 'Waiting to be pulled';
          }
          break;
        case 'NOC Application to CSEB':
          if (task.user === 'Executive Engineer') {
            task.actionDetails = this.actionDetails;
          } else if (task.user === 'ADM') {
            task.actionDetails = 'Forwarded';
          } else {
            task.actionDetails = 'Waiting to be pulled';
          }
          break;
        case 'EWS Verification':
          if (task.user === 'SDM') {
            task.actionDetails = 'Under Process';
          } else if (task.user === 'ADM' || task.user === 'Executive Engineer') {
            task.actionDetails = 'Forwarded';
          } else {
            task.actionDetails = 'Waiting to be pulled';
          }
          break;
        case 'Verification by TNCP':
          if (task.user === 'Deputy Director') {
            task.actionDetails = 'Under Process';
          } else {
            task.actionDetails = 'Forwarded';
          }
          break;
        case 'Final Colony Development Permission':
          task.actionDetails = 'Forwarded';
          break;
        default:
          task.actionDetails = 'Waiting to be pulled';
      }
    });
  }
  showDetails(task: TaskDetails) {
    alert(`Action: ${task.actionDetails}\nOfficial: ${this.official}\nRemarks: ${this.remarks}`);
    // Or if you want to use a modal instead of an alert, you'd need to implement modal logic here.
}

// Add this method to handle the display of details in an alert
showForwardedDetails(task: TaskDetails) {
  if (task.actionDetails === 'Forwarded') {
    alert(`Action: ${task.actionDetails}\nOfficial: ${task.user}\nRemarks: ${this.remarks}`);
  }
}
}