import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarOffComponent } from './sidebar-off.component';

describe('SidebarOffComponent', () => {
  let component: SidebarOffComponent;
  let fixture: ComponentFixture<SidebarOffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarOffComponent]
    });
    fixture = TestBed.createComponent(SidebarOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
