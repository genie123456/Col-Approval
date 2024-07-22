import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PullData } from 'src/app/models/pull-data.model'; // Import the interface

@Injectable({
  providedIn: 'root'
})
export class ApplyingFormService {
  private baseUrl = 'http://localhost:3000/formFields'; 

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

  // Function to get all form fields data
  getAllFormFieldsData(): Observable<PullData[]> {
    return this.http.get<PullData[]>(`${this.baseUrl}/applying-form`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching form fields data:', error);
        return throwError(() => new Error('Error fetching form fields data'));
      })
    );
  }

  // Method to save the form data as a draft (if applicable)
  saveDraft(data: any): Observable<any> {
    // Assuming drafts are saved similarly, you can update the endpoint if needed
    return this.http.post(`${this.baseUrl}/draft`, data);
  }
}
