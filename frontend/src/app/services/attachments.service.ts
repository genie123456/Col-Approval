import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  private uploadUrl = 'http://localhost:3000/fileUploads/upload';

  constructor(private http: HttpClient) { }

  uploadFiles(formData: FormData, username: string, formfields_id: string): Observable<any> {
    return this.http.post(`/fileUploads/upload/${username}/${formfields_id}`, formData);
  }  
}