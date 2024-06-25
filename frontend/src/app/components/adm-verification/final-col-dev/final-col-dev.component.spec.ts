import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalColDevComponent } from './final-col-dev.component';

describe('FinalColDevComponent', () => {
  let component: FinalColDevComponent;
  let fixture: ComponentFixture<FinalColDevComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalColDevComponent]
    });
    fixture = TestBed.createComponent(FinalColDevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
