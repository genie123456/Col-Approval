import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VphComponent } from './vph.component';

describe('VphComponent', () => {
  let component: VphComponent;
  let fixture: ComponentFixture<VphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VphComponent]
    });
    fixture = TestBed.createComponent(VphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
