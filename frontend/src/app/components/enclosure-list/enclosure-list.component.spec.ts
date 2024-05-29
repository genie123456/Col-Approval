import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnclosureListComponent } from './enclosure-list.component';

describe('EnclosureListComponent', () => {
  let component: EnclosureListComponent;
  let fixture: ComponentFixture<EnclosureListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnclosureListComponent]
    });
    fixture = TestBed.createComponent(EnclosureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
