import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

interface ApplicationDetails {
  referenceNumber: string;
  appliedDate: string;
  dueDate: string;
}

interface TaskDetails {
  taskName: string;
  user: string;
  receivedDate: string;
  processedDate: string;
  actionDetails: string;
  bunchedRefNo: string;
}

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
    {
      taskName: '',
      user: '',
      receivedDate: '',
      processedDate: 'NA',
      actionDetails: 'Under Processing',
      bunchedRefNo: 'NA'
    }
  ];

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const appReceivedDate = params.get('appReceivedDate')!;

      this.applicationDetails = {
        referenceNumber: params.get('appRefNo')!,
        appliedDate: appReceivedDate,
        dueDate: appReceivedDate
      };

      this.taskDetails[0].taskName = params.get('currentTask')!;
      this.taskDetails[0].receivedDate = appReceivedDate;
    });

    this.authService.user$.subscribe((user) => {
      if (user) {
        this.taskDetails[0].user = user.username;
      }
    });
  }
}
