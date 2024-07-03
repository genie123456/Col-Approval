import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppFormService {
  private formFieldsUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getFormFields(): Observable<any[]> {
    return this.http.get<any[]>(this.formFieldsUrl);
  }
}
