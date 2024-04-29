import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCodersComponent } from './contact-coders.component';

describe('ContactCodersComponent', () => {
  let component: ContactCodersComponent;
  let fixture: ComponentFixture<ContactCodersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactCodersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactCodersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
