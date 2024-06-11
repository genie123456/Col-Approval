import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { ApplyingFormComponent } from './components/applying-form/applying-form.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DashApplicantComponent } from './components/dash-applicant/dash-applicant.component';
import { Officer1Component } from './components/officer1/officer1.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ApplicantDashTableComponent } from './components/applicant-dash-table/applicant-dash-table.component';
import { Officer2Component } from './components/officer2/officer2.component';
import { Officer3Component } from './components/officer3/officer3.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AttachmentsComponent } from './components/attachments/attachments.component';
import { EnclosureListComponent } from './components/enclosure-list/enclosure-list.component';
import { EnclosurePrintComponent } from './components/enclosure-print/enclosure-print.component';
import { AdmVerificationComponent } from './components/adm-verification/adm-verification.component';
import { ADMSentComponent } from './components/adm-sent/adm-sent.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    HomeComponent,
    ApplyingFormComponent,
    FooterComponent,
    HeaderComponent,
    DashApplicantComponent,
    Officer1Component,
    SidebarComponent,
    ApplicantDashTableComponent,
    Officer2Component,
    Officer3Component,
    UserComponent,
    ProfileComponent,
    AttachmentsComponent,
    EnclosureListComponent,
    EnclosurePrintComponent,
    AdmVerificationComponent,
    ADMSentComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
