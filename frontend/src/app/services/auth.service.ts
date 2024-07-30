import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth'; // Updated base URL
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
    console.log('Login data:', loginData);
    return this.http.post<any>(`${this.apiUrl}/login`, loginData, { withCredentials: true,  headers: { 'Content-Type': 'application/json' } }).pipe(
      tap(response => {
        this.loggedIn.next(true);
        const user = response.user;  // Handle user object directly
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
        this.userSubject.next(null);  // Emit null user
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
          const user = response.user;
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);  // Emit the user data
        } else {
          this.loggedIn.next(false);
          localStorage.removeItem('user');
          this.userSubject.next(null);  // Emit null user
        }
      },
      error => {
        this.loggedIn.next(false);
        localStorage.removeItem('user');
        this.userSubject.next(null);  // Emit null user
      }
    );
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, { withCredentials: true }).pipe(
      tap((user: any) => this.userSubject.next(user))  // Emit the user data
    );
  }
}
