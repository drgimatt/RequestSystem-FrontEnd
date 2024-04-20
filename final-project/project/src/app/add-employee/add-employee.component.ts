import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';
import { Department } from '../model/department';
import { Subjects } from '../model/subjects';
import { DepartmentService } from '../service/department.service';
import { SubjectsService } from '../service/subjects.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{


  newEmployee: FormGroup;
  selectedFile : File;
  selectedFileName: string; 
  departmentList: Department[] = [];
  subjectsList: Subjects[] = [];
  isDataLoaded: boolean = false;
  subjects = new FormControl('');


constructor(private departmentService: DepartmentService, private subjectService: SubjectsService,private employeeService: EmployeeService, private fb: FormBuilder, private router: Router){
  this.newEmployee = this.fb.group({
    employeeID: '',
    firstName: '',
    middleName: '',
    lastName: '',
    position: '',
    department: 0,
    subjects: [],
    email: '',
    gender: '',    
    photo: null,
  })

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

  this.subjectService.getSubjects().subscribe((data: Subjects[]) => {
    this.subjectsList = data;
    this.isDataLoaded = true;
  },
  (error) => {
    this.isDataLoaded = false;
  }
);

  }

onFileChanged(event){ 
  this.selectedFile = event.target.files[0];
  if (this.selectedFile) {
    this.selectedFileName = this.selectedFile.name;
  }
}

checkFields(): boolean {
  for (const controlName in this.newEmployee.controls) {
    if (this.newEmployee.get(controlName).hasError('required')) {
      alert('Please fill out all the required fields.');
      return false;
    }
  }
  this.onUpload();
  return true;
}

navigateToHome() {
  this.router.navigate(['index']);

}

onUpload(){
  console.log(this.selectedFile);
  const employee = new FormData();
  employee.append('photoBytes', this.selectedFile);
  employee.append('employeeID', this.newEmployee.value.employeeID);
  employee.append('firstName', this.newEmployee.value.firstName);
  employee.append('middleName', this.newEmployee.value.middleName);
  employee.append('lastName', this.newEmployee.value.lastName);
  employee.append('position', this.newEmployee.value.position);
  employee.append('department', this.newEmployee.value.department.toString());
  employee.append('gender', this.newEmployee.value.gender);
  employee.append('subjects', this.subjects.getRawValue());
  employee.append('email', this.newEmployee.value.email);        
  this.employeeService.createEmployee(employee)
  .subscribe(
    (response) => {
      console.log('employee added:', response);
      console.log(employee);
      alert('This is working!');
    },
    (error) => {
      console.log(employee);
      console.log(employee.get('photo'))
      console.error('Error adding request:', error);
    }
  );    
}


}
