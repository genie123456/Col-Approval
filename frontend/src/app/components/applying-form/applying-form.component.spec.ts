import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyingFormComponent } from './applying-form.component';

describe('ApplyingFormComponent', () => {
  let component: ApplyingFormComponent;
  let fixture: ComponentFixture<ApplyingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyingFormComponent]
    });
    fixture = TestBed.createComponent(ApplyingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
