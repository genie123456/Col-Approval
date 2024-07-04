import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplyingFormService {
  private baseUrl = 'http://localhost:3000/formFields'; // Adjusted URL

  constructor(private http: HttpClient) { }

  // Function to save applying form data
  saveApplyingFormData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/applying-form`, data);
  }

  // Function to get applying form data
  getApplyingFormData(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/applying-form/${id}`);
  }

  // Function to save applicant data
  saveApplicantData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/applicant-data`, data);
  }

  // Function to get applicant data
  getApplicantData(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/applicant-data/${id}`);
  }

  // Method to save the form data as a draft (if applicable)
  saveDraft(data: any): Observable<any> {
    // Assuming drafts are saved similarly, you can update the endpoint if needed
    return this.http.post(`${this.baseUrl}/draft`, data);
  }
}
