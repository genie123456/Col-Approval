import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySDMComponent } from './verify-sdm.component';

describe('VerifySDMComponent', () => {
  let component: VerifySDMComponent;
  let fixture: ComponentFixture<VerifySDMComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifySDMComponent]
    });
    fixture = TestBed.createComponent(VerifySDMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
