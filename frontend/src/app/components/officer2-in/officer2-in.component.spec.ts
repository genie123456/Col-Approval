import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Officer2InComponent } from './officer2-in.component';

describe('Officer2InComponent', () => {
  let component: Officer2InComponent;
  let fixture: ComponentFixture<Officer2InComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Officer2InComponent]
    });
    fixture = TestBed.createComponent(Officer2InComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
