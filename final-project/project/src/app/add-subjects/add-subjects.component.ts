import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Department } from '../model/department';
import { DepartmentService } from '../service/department.service';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { SubjectsService } from '../service/subjects.service';
import { DatePipe } from '@angular/common';
import { Subjects } from '../model/subjects';

@Component({
  selector: 'app-add-subjects',
  templateUrl: './add-subjects.component.html',
  styleUrls: ['./add-subjects.component.css']
})
export class AddSubjectsComponent {
  newSubject: FormGroup;
  employees = new FormControl('');
  subject: Subjects
  departmentList: Department[] = [];
  employeeList: Employee[] = [];
  forEditing: boolean = false;
  isDataLoaded: boolean = false;
  selectedValues: string[] = []

  constructor(private subjectService: SubjectsService, private departmentService: DepartmentService, private employeeService: EmployeeService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe) {
    this.newSubject = this.fb.group({
      courseCode: ['', [Validators.required]],
      courseName: ['', [Validators.required]],
      department: 0,
      employees: []
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
  
    this.route.params.forEach((params: Params) => {  
      if (params['id'] !== undefined) {
        this.forEditing = true;
        this.newSubject.get('');
        const id = params['id'];
        this.subjectService.getSubject(id).subscribe(data => {
          this.subject = data;
          this.initializeForm();
        });
      } 

  }); 

  }

  initializeForm(){
    const employeeIds = this.subject.employees.map(employee => employee.myId);
    this.newSubject = this.fb.group({
      courseCode: [this.subject.courseCode, [Validators.required]],
      courseName: [this.subject.name, [Validators.required]],
      department: [this.subject.department.id],
      employees: [this.subject.employees.map(employee => employee.myId)] 
    });
    this.selectedValues = this.subject.employees.map(employee => employee.myId.toString())
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
    if (this.forEditing === false) {
      this.onUpload();
    } else {
      this.onEdit();
    }
    return true;

  }

  onEdit() {
    const subjectData = new FormData();
    subjectData.append('myId',this.subject.myId.toString())
    subjectData.append('courseCode', this.newSubject.value.courseCode);
    subjectData.append('name', this.newSubject.value.courseName);
    if(this.employees.getRawValue() !== null){
      subjectData.append('employees',this.employees.getRawValue());
    }
    subjectData.append('department', this.newSubject.value.department.toString());
    console.log('SubjectDATA:', subjectData);
    this.subjectService.updateSubject(this.subject.myId, subjectData)
    .subscribe(
      (response) => {
        console.log('Subject added (RESPONSE):', response);
        console.log('Course code: ', this.newSubject.value.courseCode);
        console.log('Course name: ', this.newSubject.value.courseName);
        console.log('Department: ', this.newSubject.value.department);
        console.log('Employee: ',this.employees.getRawValue());
        alert('Subject has been updated!');
        this.router.navigate(['/subjects-page']);
      },
      (error) => {
        console.log(subjectData);
        console.log('Course code: ', this.newSubject.value.courseCode);
        console.log('Course name: ', this.newSubject.value.courseName);
        console.log('Department: ', this.newSubject.value.department);
        console.log('Employee: ',this.employees.getRawValue());
        console.error('Error updating request:', error);
      }
    );
  }


  onUpload() {
    const subjectData = new FormData();
    subjectData.append('courseCode', this.newSubject.value.courseCode);
    subjectData.append('name', this.newSubject.value.courseName);
    if(this.employees.getRawValue() !== null){
      subjectData.append('employees',this.employees.getRawValue());
    }
    subjectData.append('department', this.newSubject.value.department.toString());
    console.log('SubjectDATA:', subjectData);
    this.subjectService.createSubject(subjectData)
    .subscribe(
      (response) => {
        console.log('Subject added (RESPONSE):', response);
        console.log('Course code: ', this.newSubject.value.courseCode);
        console.log('Course name: ', this.newSubject.value.courseName);
        console.log('Department: ', this.newSubject.value.department);
        console.log('Employee: ',this.employees.getRawValue());
        alert('Subject has been added!');
        this.router.navigate(['/subjects-page']);
      },
      (error) => {
        console.log(subjectData);
        console.log('Course code: ', this.newSubject.value.courseCode);
        console.log('Course name: ', this.newSubject.value.courseName);
        console.log('Department: ', this.newSubject.value.department);
        console.log('Employee: ',this.employees.getRawValue());
        console.error('Error adding request:', error);
      }
    );
  }
}
