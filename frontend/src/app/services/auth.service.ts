import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private loggedIn = new BehaviorSubject<boolean>(false);
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();


  constructor(private http: HttpClient) { 
    this.checkSession();
  }

  signup(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/signup', data);
  }

  login(username: string, password: string, type: string): Observable<any> {
    const loginData = { username, password, type };
    return this.http.post<any>(`${this.apiUrl}/login`, loginData, { withCredentials: true }).pipe(
      tap(response => {
        this.loggedIn.next(true);
        const user = { username: response.user.username };
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);  // Emit the user data
      })
    );
  }
  
  

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.loggedIn.next(false);
        localStorage.removeItem('user');
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  checkSession(): void {
    this.http.get<any>(`${this.apiUrl}/profile`, { withCredentials: true }).subscribe(
      response => {
        if (response.user) {
          this.loggedIn.next(true);
          const user = { username: response.user.username };
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);  // Emit the user data
        } else {
          this.loggedIn.next(false);
          localStorage.removeItem('user');
          this.userSubject.next(null);
        }
      },
      error => {
        this.loggedIn.next(false);
        localStorage.removeItem('user');
        this.userSubject.next(null);
      }
    );
  }
    
  

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, { withCredentials: true });
  }
}

 // signup(username: string, email: string, phoneNumber: string, password: string, type: string): Observable<any> {
  //   const signupData = { username, email, phoneNumber, password, type };
  //   return this.http.post<any>(`${this.apiUrl}/signup`, signupData);
  // }