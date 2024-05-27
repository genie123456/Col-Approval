import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Officer1Component } from './officer1.component';

describe('Officer1Component', () => {
  let component: Officer1Component;
  let fixture: ComponentFixture<Officer1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Officer1Component]
    });
    fixture = TestBed.createComponent(Officer1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
