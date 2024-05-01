import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcernsPageComponent } from './concerns-page.component';

describe('ConcernsPageComponent', () => {
  let component: ConcernsPageComponent;
  let fixture: ComponentFixture<ConcernsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcernsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConcernsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
