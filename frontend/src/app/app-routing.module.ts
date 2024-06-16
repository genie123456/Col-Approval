import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your newly created user components
import { Officer1Component } from './components/officer1/officer1.component';
import { Officer1InComponent } from './components/officer1-in/officer1-in.component';
import { Officer2Component } from './components/officer2/officer2.component';
import { Officer3Component } from './components/officer3/officer3.component';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ApplyingFormComponent } from './components/applying-form/applying-form.component';

import { DashApplicantComponent } from './components/dash-applicant/dash-applicant.component';
import { AttachmentsComponent } from './components/attachments/attachments.component';
import { EnclosureListComponent } from './components/enclosure-list/enclosure-list.component';
import { EnclosurePrintComponent } from './components/enclosure-print/enclosure-print.component';
import { AdmVerificationComponent } from './components/adm-verification/adm-verification.component';

import { authGuard } from './guards/auth.guard';
import { Officer2InComponent } from './components/officer2-in/officer2-in.component';
import { VerifyEEComponent } from './components/verify-ee/verify-ee.component';
import { Officer3InComponent } from './components/officer3-in/officer3-in.component';
import { VerifySDMComponent } from './components/verify-sdm/verify-sdm.component';


// Define routes
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },

  { path: 'dashboard', component: DashboardComponent }, // , canActivate: [authGuard]
  { path: 'apply', component: ApplyingFormComponent },
  { path: 'applicant-dashboard', component: DashApplicantComponent }, 
  { path: 'officer1', component: Officer1Component },
  { path: 'officer1/inbox', component: Officer1InComponent },
  { path: 'officer2', component: Officer2Component },
  { path: 'officer2/inbox', component: Officer2InComponent },
  { path: 'officer3', component: Officer3Component },
  { path: 'officer3/inbox', component: Officer3InComponent },
  { path: 'attachments', component: AttachmentsComponent },
  { path: 'enclosureList', component: EnclosureListComponent },
  { path: 'enclosurePrint', component: EnclosurePrintComponent },
  { path: 'officer1/verification/:serviceName/:currentTask/:appRefNo/:appReceivedDate', component: AdmVerificationComponent },
  { path: 'officer2/verification/:serviceName/:currentTask/:appRefNo/:appReceivedDate', component: VerifyEEComponent },
  { path: 'officer3/verification/:serviceName/:currentTask/:appRefNo/:appReceivedDate', component: VerifySDMComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
