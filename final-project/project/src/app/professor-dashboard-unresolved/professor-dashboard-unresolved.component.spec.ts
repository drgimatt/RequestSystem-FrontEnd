import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorDashboardUnresolvedComponent } from './professor-dashboard-unresolved.component';

describe('ProfessorDashboardUnresolvedComponent', () => {
  let component: ProfessorDashboardUnresolvedComponent;
  let fixture: ComponentFixture<ProfessorDashboardUnresolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorDashboardUnresolvedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessorDashboardUnresolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
