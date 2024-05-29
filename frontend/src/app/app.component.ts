import { Component, OnInit } from '@angular/core';
import { AppFormService } from './services/app-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (private appFormService: AppFormService) {}
  ngOnInit(): void {
    this.getDynamicFormFields();
  }

  getDynamicFormFields() {
    this.appFormService.getFormFields().subscribe(
      (response) => {
        console.log(response);
      }
    )
  }
}
