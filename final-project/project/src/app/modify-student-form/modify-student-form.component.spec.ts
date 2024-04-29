import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyStudentFormComponent } from './modify-student-form.component';

describe('ModifyStudentFormComponent', () => {
  let component: ModifyStudentFormComponent;
  let fixture: ComponentFixture<ModifyStudentFormComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ModifyStudentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyStudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
