import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiversionCertificateComponent } from './diversion-certificate.component';

describe('DiversionCertificateComponent', () => {
  let component: DiversionCertificateComponent;
  let fixture: ComponentFixture<DiversionCertificateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiversionCertificateComponent]
    });
    fixture = TestBed.createComponent(DiversionCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
