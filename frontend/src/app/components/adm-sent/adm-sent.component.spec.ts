import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ADMSentComponent } from './adm-sent.component';

describe('ADMSentComponent', () => {
  let component: ADMSentComponent;
  let fixture: ComponentFixture<ADMSentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ADMSentComponent]
    });
    fixture = TestBed.createComponent(ADMSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
