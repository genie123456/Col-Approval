import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
  @ViewChild('togglePassword') togglePasswordButton!: ElementRef;

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
      type: ['official1', Validators.required] // Set a default value
    });
  }

  showPassword = false; // Initial state: password hidden

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';

    // Toggle the eye icon visibility
    const eyeIcon = this.togglePasswordButton.nativeElement.querySelector('i.bi-eye');
    const eyeSlashIcon = this.togglePasswordButton.nativeElement.querySelector('i.bi-eye-slash');
    if (this.showPassword) {
      eyeIcon.classList.remove('d-none');
      eyeSlashIcon.classList.add('d-none');
    } else {
      eyeIcon.classList.add('d-none');
      eyeSlashIcon.classList.remove('d-none');
    }
  }
  
  loginUser() {
    if (this.loginForm.valid) {
      const { username, password, type } = this.loginForm.value;

      this.authService.login(username, password, type).subscribe(
        response => {
          console.log('Login successful:', response);
          this.loginSuccess = true;

          // Navigate based on user type
          switch (response.user.type) {
            case 'official1':
              this.router.navigateByUrl('/officer1');
              break;
            case 'official2':
              this.router.navigateByUrl('/officer2');
              break;
            case 'official3':
              this.router.navigateByUrl('/officer3');
              break;
            case 'official4':
              this.router.navigateByUrl('/officer4');
              break;
            case 'applicant':
              this.router.navigateByUrl('/applicant-dashboard');
              break;
            default:
              this.router.navigateByUrl('/dashboard');
              break;
          }
        },
        error => {
          console.error('Login failed:', error);
          this.loginError = true;
          this.openErrorModal();
        }
      );
    } else {
      console.log('Form is invalid. Please check your inputs.');
    }
  }

  openErrorModal() {
    this.modalService.open(this.errorModal);
  }
}