import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('errorModal') errorModal!: ElementRef;

  loginForm: FormGroup;
  loginSuccess: boolean = false;
  loginError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router, 
    private modalService: NgbModal
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      type: ['official', Validators.required]
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      const type = this.loginForm.value.type;

      this.authService.login(username, password, type)
        .subscribe(
          response => {
            console.log('Login successful:');
            this.loginSuccess = true;
            if (this.loginSuccess) {  
              if (response.user.type === 'official1') {
                this.router.navigateByUrl('/officer1');
              }
              else if(response.user.type==='official2'){
                this.router.navigateByUrl('/officer2');
              }
              else if(response.user.type==='official3'){
                this.router.navigateByUrl('/officer3');
              }
                 else if (type === 'applicant') {
                this.router.navigateByUrl('/applicant-dashboard');
              }   
            }
          },
          error => {
            console.error('Login failed:', error);
            this.openErrorModal();
          }
        );
    } else {
      console.log('Form is invalid. Please check your inputs.');
    }
  }

  openErrorModal() {
    // Open Bootstrap modal
    this.modalService.open(this.errorModal);
  }
}
