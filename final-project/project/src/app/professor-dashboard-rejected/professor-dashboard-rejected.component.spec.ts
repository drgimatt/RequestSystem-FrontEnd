import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorDashboardRejectedComponent } from './professor-dashboard-rejected.component';

describe('ProfessorDashboardRejectedComponent', () => {
  let component: ProfessorDashboardRejectedComponent;
  let fixture: ComponentFixture<ProfessorDashboardRejectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorDashboardRejectedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessorDashboardRejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
