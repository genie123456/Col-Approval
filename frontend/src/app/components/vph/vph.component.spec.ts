import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VPHComponent } from './vph.component';

describe('VPHComponent', () => {
  let component: VPHComponent;
  let fixture: ComponentFixture<VPHComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VPHComponent]
    });
    fixture = TestBed.createComponent(VPHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
