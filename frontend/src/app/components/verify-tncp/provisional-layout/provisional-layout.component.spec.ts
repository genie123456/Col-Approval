import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionalLayoutComponent } from './provisional-layout.component';

describe('ProvisionalLayoutComponent', () => {
  let component: ProvisionalLayoutComponent;
  let fixture: ComponentFixture<ProvisionalLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProvisionalLayoutComponent]
    });
    fixture = TestBed.createComponent(ProvisionalLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
