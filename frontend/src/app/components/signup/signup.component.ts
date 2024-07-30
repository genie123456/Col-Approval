import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup; 
  signupSuccess: boolean = false; 

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], 
      password: ['', [Validators.required, Validators.minLength(6)]],
      type: ['applicant'] // Default value
    });
  }

  signupUser() {
    if (this.signupForm.valid) {
      // Extract signup data from the form
      const username = this.signupForm.value.username;
      const email = this.signupForm.value.email;
      const phoneNumber = this.signupForm.value.phoneNumber;
      const password = this.signupForm.value.password;
      const type = this.signupForm.value.type; // Default value

      this.authService.signup(this.signupForm.value).subscribe((data: any) => {
        // const data1 = data; 
        alert("Signup successful")
      } )
    } else {
      console.log('Form is invalid. Please check your inputs.');
    }
  }
}
