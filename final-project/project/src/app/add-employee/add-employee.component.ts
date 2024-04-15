import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {


  newEmployee: FormGroup;
  selectedFile : File;
  selectedFileName: string; 

constructor(private employeeService: EmployeeService, private fb: FormBuilder, private router: Router){
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
  employee.append('subjects', this.newEmployee.value.subjects);
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
