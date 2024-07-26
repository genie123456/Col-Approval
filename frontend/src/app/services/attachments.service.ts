import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  private uploadUrl = 'http://localhost:3000/fileUploads/upload';

  constructor(private http: HttpClient) { }

  uploadFiles(formData: FormData): Observable<any> {
    return this.http.post(this.uploadUrl, formData);
  }
}