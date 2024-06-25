import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Officer4Component } from './officer4.component';

describe('Officer4Component', () => {
  let component: Officer4Component;
  let fixture: ComponentFixture<Officer4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Officer4Component]
    });
    fixture = TestBed.createComponent(Officer4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
