import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorDashboardCompletedComponent } from './professor-dashboard-completed.component';

describe('ProfessorDashboardCompletedComponent', () => {
  let component: ProfessorDashboardCompletedComponent;
  let fixture: ComponentFixture<ProfessorDashboardCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorDashboardCompletedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessorDashboardCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
