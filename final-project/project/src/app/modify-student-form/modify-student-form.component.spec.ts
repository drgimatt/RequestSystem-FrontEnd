import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyStudentFormComponent } from './modify-student-form.component';

describe('ModifyStudentFormComponent', () => {
  let component: ModifyStudentFormComponent;
  let fixture: ComponentFixture<ModifyStudentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModifyStudentFormComponent]
    });
    fixture = TestBed.createComponent(ModifyStudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
