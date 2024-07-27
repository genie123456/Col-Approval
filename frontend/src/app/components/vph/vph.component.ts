import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskDetails } from 'src/app/models/task-details.model';
import { ApplicationDetails } from 'src/app/models/application-details.model';

@Component({
  selector: 'app-vph',
  templateUrl: './vph.component.html',
  styleUrls: ['./vph.component.css']
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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const appReceivedDate = params.get('appReceivedDate')!;

      this.applicationDetails = {
        referenceNumber: params.get('appRefNo')!,
        appliedDate: appReceivedDate,
        dueDate: appReceivedDate
      };
    });
  }
}
