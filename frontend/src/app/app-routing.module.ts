import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your newly created user components
import { Officer1Component } from './components/officer1/officer1.component';
import { Officer2Component } from './components/officer2/officer2.component';
import { Officer3Component } from './components/officer3/officer3.component';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ApplyingFormComponent } from './components/applying-form/applying-form.component';

import { DashApplicantComponent } from './components/dash-applicant/dash-applicant.component';
import { UserComponent } from './components/user/user.component';

// Define routes
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'apply', component: ApplyingFormComponent },
  { path: 'applicant-dashboard', component: DashApplicantComponent }, 
  { path: 'officer1', component: Officer1Component },
  { path: 'officer2', component: Officer2Component },
  { path: 'officer3', component: Officer3Component },

  // User-specific routes with dynamic user type and component
  // {
  //   path: 'user/:type', // Dynamic route for user pages
  //   component: UserComponent, 
  //   children: [
  //     { path: 'officer1', component: Officer1Component },
  //     { path: 'officer2', component: Officer2Component },
  //     { path: 'officer3', component: Officer3Component },
  //     { path: '**', redirectTo: '' }, // Handle unmatched paths within user routes
  //   ]
  // },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
