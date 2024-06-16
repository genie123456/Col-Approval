import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Officer3InComponent } from './officer3-in.component';

describe('Officer3InComponent', () => {
  let component: Officer3InComponent;
  let fixture: ComponentFixture<Officer3InComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Officer3InComponent]
    });
    fixture = TestBed.createComponent(Officer3InComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
