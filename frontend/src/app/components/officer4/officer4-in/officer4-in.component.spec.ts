import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Officer4InComponent } from './officer4-in.component';

describe('Officer4InComponent', () => {
  let component: Officer4InComponent;
  let fixture: ComponentFixture<Officer4InComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Officer4InComponent]
    });
    fixture = TestBed.createComponent(Officer4InComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
