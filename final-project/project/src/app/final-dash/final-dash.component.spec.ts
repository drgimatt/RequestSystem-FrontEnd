import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalDashComponent } from './final-dash.component';

describe('FinalDashComponent', () => {
  let component: FinalDashComponent;
  let fixture: ComponentFixture<FinalDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinalDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
