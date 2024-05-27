import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfficialsService {
  private officialsUrl = 'http://localhost:3000/officials';

  constructor(private http: HttpClient) { }

  getOfficials(): Observable<any[]> {
    return this.http.get<any[]>(this.officialsUrl);
  }
}
