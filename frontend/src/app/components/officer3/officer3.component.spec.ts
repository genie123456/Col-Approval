import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Officer3Component } from './officer3.component';

describe('Officer3Component', () => {
  let component: Officer3Component;
  let fixture: ComponentFixture<Officer3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Officer3Component]
    });
    fixture = TestBed.createComponent(Officer3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
