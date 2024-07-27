import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { ApplicantDashTableComponent } from './components/dash-applicant/applicant-dash-table/applicant-dash-table.component';
import { Officer2Component } from './components/officer2/officer2.component';
import { Officer3Component } from './components/officer3/officer3.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AttachmentsComponent } from './components/attachments/attachments.component';
import { EnclosureListComponent } from './components/enclosure-list/enclosure-list.component';
import { EnclosurePrintComponent } from './components/enclosure-print/enclosure-print.component';
import { AdmVerificationComponent } from './components/adm-verification/adm-verification.component';
import { ADMSentComponent } from './components/adm-sent/adm-sent.component';
import { SidebarOffComponent } from './components/sidebar-off/sidebar-off.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Officer1InComponent } from './components/officer1/officer1-in/officer1-in.component';
import { Officer2InComponent } from './components/officer2/officer2-in/officer2-in.component';
import { VerifyEEComponent } from './components/verify-ee/verify-ee.component';
import { VerifySDMComponent } from './components/verify-sdm/verify-sdm.component';
import { Officer3InComponent } from './components/officer3/officer3-in/officer3-in.component';
// import { VPHComponent } from './components/adm-verification/vph/vph.component';
import { Officer4Component } from './components/officer4/officer4.component';
import { Officer4InComponent } from './components/officer4/officer4-in/officer4-in.component';
import { VerifyTNCPComponent } from './components/verify-tncp/verify-tncp.component';
import { ProvisionalLayoutComponent } from './components/verify-tncp/provisional-layout/provisional-layout.component';
import { DiversionCertificateComponent } from './components/verify-sdm/diversion-certificate/diversion-certificate.component';
import { DevelopmentPermissionComponent } from './components/verify-sdm/development-permission/development-permission.component';
import { FinalColDevComponent } from './components/adm-verification/final-col-dev/final-col-dev.component';
import { ApplicantDataComponent } from './components/applying-form/applicant-data/applicant-data.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { FormDataComponent } from './components/form-data/form-data.component';
import { ApplyingFormService } from './services/applying-form.service';
import { PreviewModalComponent } from './components/preview-modal/preview-modal.component';
import { CommonModule } from '@angular/common';
import { ModalService } from './services/modal.service';
import { VPHComponent } from './components/vph/vph.component';

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
    ADMSentComponent,
    SidebarOffComponent,
    Officer1InComponent,
    Officer2InComponent,
    VerifyEEComponent,
    VerifySDMComponent,
    Officer3InComponent,
    // VPHComponent,
    Officer4Component,
    Officer4InComponent,
    VerifyTNCPComponent,
    ProvisionalLayoutComponent,
    DiversionCertificateComponent,
    DevelopmentPermissionComponent,
    FinalColDevComponent,
    ApplicantDataComponent,
    SplashScreenComponent,
    PreviewModalComponent,
    FormDataComponent,
    VPHComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NoopAnimationsModule,
    CommonModule
  ],
  providers: [ApplyingFormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
