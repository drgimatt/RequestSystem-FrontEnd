import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardRejectedComponent } from './admin_dash_rejected.component';

describe('AdminDashboardRejectedComponent', () => {
  let component: AdminDashboardRejectedComponent;
  let fixture: ComponentFixture<AdminDashboardRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardRejectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDashboardRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
