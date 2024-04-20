import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Department } from '../model/department';
import { DepartmentService } from '../service/department.service';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { SubjectsService } from '../service/subjects.service';

@Component({
  selector: 'app-add-subjects',
  templateUrl: './add-subjects.component.html',
  styleUrls: ['./add-subjects.component.css']
})
export class AddSubjectsComponent {
  newSubject: FormGroup;
  employees = new FormControl('');
  departmentList: Department[] = [];
  employeeList: Employee[] = [];
  isDataLoaded: boolean = false;

  constructor(private subjectService: SubjectsService, private departmentService: DepartmentService, private employeeService: EmployeeService, private fb: FormBuilder, private router: Router) {
    this.newSubject = this.fb.group({
      courseCode: '',
      courseName: '',
      department: 0
    });

  }

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((data: Department[]) => {
      this.departmentList = data;
      this.isDataLoaded = true;
    },
    (error) => {
      this.isDataLoaded = false;
    }
  );

  this.employeeService.getEmployees().subscribe((data: Employee[]) => {
    this.employeeList = data;
    this.isDataLoaded = true;
  },
  (error) => {
    this.isDataLoaded = false;
  }
);
  
  }

  navigateToHome() {
    this.router.navigate(['index']);
  }

  checkFields(): boolean {
    for (const controlName in this.newSubject.controls) {
      if (this.newSubject.get(controlName).hasError('required')) {
        alert('Please fill out all the required fields.');
        return false;
      }
    }
    this.onUpload();
    return true;

  }



  onUpload() {
    const subjectData = new FormData();
    subjectData.append('courseCode', this.newSubject.value.courseCode);
    subjectData.append('name', this.newSubject.value.courseName);
    subjectData.append('employees',this.employees.getRawValue().toString());
    subjectData.append('department', this.newSubject.value.department.toString());
    this.subjectService.createSubject(subjectData)
    .subscribe(
      (response) => {
        console.log('Subject added:', response);
        console.log(this.newSubject.value.courseCode);
        console.log(this.newSubject.value.courseName);
        console.log(this.newSubject.value.department);
        console.log('Employee:',this.employees.getRawValue());
        alert('This is working!');
      },
      (error) => {
        console.log(subjectData);
        console.log(this.newSubject.value.courseCode);
        console.log(this.newSubject.value.courseName);
        console.log(this.newSubject.value.department);
        console.log(this.employees.getRawValue());
        console.error('Error adding request:', error);
      }
    );
  }
}
