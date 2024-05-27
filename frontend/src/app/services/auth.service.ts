import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  signup(username: string, email: string, phoneNumber: string, password: string, type: string): Observable<any> {
    const signupData = { username, email, phoneNumber, password, type };
    return this.http.post<any>(`${this.apiUrl}/signup`, signupData);
  }

  login(username: string, password: string, type: string): Observable<any> {
    const loginData = { username, password, type };
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      tap(() => {
        this.loggedIn.next(true);
      })
    );
  }

  logout(): void {
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
