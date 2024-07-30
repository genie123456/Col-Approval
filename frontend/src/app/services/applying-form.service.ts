import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PullData } from 'src/app/models/pull-data.model';

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
    return this.http.get(`${this.baseUrl}/applying-form/${id}`).pipe(
      map((response: any) => {
        // console.log('Full API response:', response);
        return {
          formFieldsData: response.formFieldsData || {}, // Ensure correct default value
          applicantData: response.applicantData || {}    // Ensure correct default value
        };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching form data:', error);
        return throwError(() => new Error('Error fetching form data'));
      })
    );
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
    return this.http.get<any[]>(`${this.baseUrl}/applying-form`).pipe(
      map((response: any[]) => Array.isArray(response) ? response : [response]),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching form fields data:', error);
        return throwError(() => new Error('Error fetching form fields data'));
      })
    );
  }

  getJoinedFormFieldsDataById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/applying-form/joined/${id}`).pipe(
      map((response: any) => {
        // console.log('Full API response:', response);
        return {
          formFieldsData: response || {}, // Ensure correct default value
          applicantData: response || {}    // Ensure correct default value
        };
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching joined form data:', error);
        return throwError(() => new Error('Error fetching joined form data'));
      })
    );
  }

  getFormFieldsDataByUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/applying-form/username/${username}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching form fields data by username:', error);
        return throwError(() => new Error('Error fetching form fields data by username'));
      })
    );
  }
  
  // Method to save the form data as a draft (if applicable)
  saveDraft(data: any): Observable<any> {
    // Assuming drafts are saved similarly, you can update the endpoint if needed
    return this.http.post(`${this.baseUrl}/draft`, data);
  }
}
