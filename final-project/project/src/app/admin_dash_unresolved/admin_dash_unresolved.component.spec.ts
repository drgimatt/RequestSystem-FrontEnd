import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardUnresolvedComponent } from './admin_dash_unresolved.component';

describe('AdminDashboardUnresolvedComponent', () => {
  let component: AdminDashboardUnresolvedComponent;
  let fixture: ComponentFixture<AdminDashboardUnresolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardUnresolvedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDashboardUnresolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
