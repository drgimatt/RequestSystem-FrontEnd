import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardCompletedComponent } from './admin_dash_completed.component';

describe('AdminDashboardCompletedComponent', () => {
  let component: AdminDashboardCompletedComponent;
  let fixture: ComponentFixture<AdminDashboardCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardCompletedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDashboardCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
