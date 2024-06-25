import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantDashTableComponent } from './applicant-dash-table.component';

describe('ApplicantDashTableComponent', () => {
  let component: ApplicantDashTableComponent;
  let fixture: ComponentFixture<ApplicantDashTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantDashTableComponent]
    });
    fixture = TestBed.createComponent(ApplicantDashTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
