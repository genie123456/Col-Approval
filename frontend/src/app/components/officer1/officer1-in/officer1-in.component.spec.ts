import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Officer1InComponent } from './officer1-in.component';

describe('Officer1InComponent', () => {
  let component: Officer1InComponent;
  let fixture: ComponentFixture<Officer1InComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Officer1InComponent]
    });
    fixture = TestBed.createComponent(Officer1InComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
