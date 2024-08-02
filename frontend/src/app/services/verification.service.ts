// verification.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VerificationData } from 'src/app/models/verification-data.model';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private verificationData = new BehaviorSubject<VerificationData | null>(null);

  setVerificationData(data: VerificationData) {
    console.log('Verification data set:', data);
    this.verificationData.next(data);
  }

  getVerificationData() {
    return this.verificationData.asObservable();
  }
}
