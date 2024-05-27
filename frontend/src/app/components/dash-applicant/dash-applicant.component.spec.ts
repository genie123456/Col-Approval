import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashApplicantComponent } from './dash-applicant.component';

describe('DashApplicantComponent', () => {
  let component: DashApplicantComponent;
  let fixture: ComponentFixture<DashApplicantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashApplicantComponent]
    });
    fixture = TestBed.createComponent(DashApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
