import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdvisingtypeComponent } from './add-advisingtype.component';

describe('AddAdvisingtypeComponent', () => {
  let component: AddAdvisingtypeComponent;
  let fixture: ComponentFixture<AddAdvisingtypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAdvisingtypeComponent]
    });
    fixture = TestBed.createComponent(AddAdvisingtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
