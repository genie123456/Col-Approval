import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnclosurePrintComponent } from './enclosure-print.component';

describe('EnclosurePrintComponent', () => {
  let component: EnclosurePrintComponent;
  let fixture: ComponentFixture<EnclosurePrintComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnclosurePrintComponent]
    });
    fixture = TestBed.createComponent(EnclosurePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
