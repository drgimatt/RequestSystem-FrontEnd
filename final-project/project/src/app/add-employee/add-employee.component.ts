import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../model/department';
import { Subjects } from '../model/subjects';
import { DepartmentService } from '../service/department.service';
import { SubjectsService } from '../service/subjects.service';
import { DatePipe } from '@angular/common';
import { Employee } from '../model/employee';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{

  newEmployee: FormGroup;
  employee: Employee
  selectedFile : File;
  selectedFileName: string; 
  departmentList: Department[] = [];
  subjectsList: Subjects[] = [];
  isDataLoaded: boolean = false;
  subjects = new FormControl('');
  showOtherTextbox: boolean = false;


constructor(private departmentService: DepartmentService, private subjectService: SubjectsService, private employeeService: EmployeeService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe){
  this.newEmployee = this.fb.group({
    employeeID: ['',[Validators.required, Validators.pattern('^[0-9]+$')]],
    firstName: ['',[Validators.required]],
    middleName: ['',[Validators.required]],
    lastName: ['',[Validators.required]],
    position: ['',[Validators.required]],
    department: 0,
    subjects: [],
    email: ['', [Validators.required, Validators.email]],
    gender:['',[Validators.required]],
    otherGender: ['',[Validators.required]],    
    photo: null,
    status: ''
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
  // Check form fields including email format
  if (this.newEmployee.get('email').invalid) {
    alert('Please enter a valid email.');
    return false;
  }
  for (const controlName in this.newEmployee.controls) {
    if (this.newEmployee.get(controlName).hasError('required')) {
      alert('Please fill out all the required fields.');
      return false;
    }
  }
  this.onUpload();
  return true;
}

onGenderChange(event: any) {
  const selectedValue = event.target.value;
  if (selectedValue === 'Other') {
    this.showOtherTextbox = true;
    this.newEmployee.get('otherGender')?.setValidators(Validators.required);
  } else {
    this.showOtherTextbox = false;
    this.newEmployee.get('otherGender')?.clearValidators();
    this.newEmployee.get('otherGender')?.setValue('');
  }
  this.newEmployee.get('otherGender')?.updateValueAndValidity();
}

navigateToHome() {
  this.router.navigate(['index']);

}

getCurrentDate(): string {
  const currentDate = new Date();
  // Format the date as "YYYY-MM-DD HH:mm:ss"
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
  return formattedDate;
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
  employee.append('dateAdded', this.getCurrentDate())
  employee.append('department', this.newEmployee.value.department.toString());
  employee.append('status', 'Active')
  if (this.showOtherTextbox === true){
    employee.append('gender', this.newEmployee.value.otherGender);
  } else {
    employee.append('gender', this.newEmployee.value.gender);
  }
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

export function emailFormat(control: AbstractControl): { [key: string]: boolean } | null {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (control.value && !emailPattern.test(control.value)) {
    return { 'emailFormat': true };
  }
  return null;
}
