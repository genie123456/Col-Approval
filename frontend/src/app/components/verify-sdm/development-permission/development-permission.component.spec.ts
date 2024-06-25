import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentPermissionComponent } from './development-permission.component';

describe('DevelopmentPermissionComponent', () => {
  let component: DevelopmentPermissionComponent;
  let fixture: ComponentFixture<DevelopmentPermissionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevelopmentPermissionComponent]
    });
    fixture = TestBed.createComponent(DevelopmentPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
