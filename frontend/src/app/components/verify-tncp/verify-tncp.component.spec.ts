import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTNCPComponent } from './verify-tncp.component';

describe('VerifyTNCPComponent', () => {
  let component: VerifyTNCPComponent;
  let fixture: ComponentFixture<VerifyTNCPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifyTNCPComponent]
    });
    fixture = TestBed.createComponent(VerifyTNCPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
