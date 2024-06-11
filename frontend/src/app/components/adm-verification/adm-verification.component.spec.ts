import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADMVerificationComponent } from './adm-verification.component';

describe('ADMVerificationComponent', () => {
  let component: ADMVerificationComponent;
  let fixture: ComponentFixture<ADMVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ADMVerificationComponent]
    });
    fixture = TestBed.createComponent(ADMVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
