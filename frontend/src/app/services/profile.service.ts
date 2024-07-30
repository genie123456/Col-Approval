import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, { withCredentials: true });
  }
}
