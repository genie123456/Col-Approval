import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEEComponent } from './verify-ee.component';

describe('VerifyEEComponent', () => {
  let component: VerifyEEComponent;
  let fixture: ComponentFixture<VerifyEEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyEEComponent]
    });
    fixture = TestBed.createComponent(VerifyEEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
