import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Officer2Component } from './officer2.component';

describe('Officer2Component', () => {
  let component: Officer2Component;
  let fixture: ComponentFixture<Officer2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Officer2Component]
    });
    fixture = TestBed.createComponent(Officer2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
