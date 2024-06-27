import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantDataComponent } from './applicant-data.component';

describe('ApplicantDataComponent', () => {
  let component: ApplicantDataComponent;
  let fixture: ComponentFixture<ApplicantDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantDataComponent]
    });
    fixture = TestBed.createComponent(ApplicantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
