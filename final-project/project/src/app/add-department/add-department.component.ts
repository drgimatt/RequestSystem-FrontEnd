import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from '../service/department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {
  newDepartment: FormGroup

  constructor(private departmentService: DepartmentService, private fb: FormBuilder, private router: Router) {
    this.newDepartment = this.fb.group({
      name: ''
    });

  }



  navigateToHome() {
    this.router.navigate(['index']);

  }

  checkFields(): boolean {
    for (const controlName in this.newDepartment.controls) {
      if (this.newDepartment.get(controlName).hasError('required')) {
        alert('Please fill out all the required fields.');
        return false;
      }
    }
    this.onUpload();
    return true;

  }



  onUpload() {
    const departmentData = new FormData();
    departmentData.append('name', this.newDepartment.value.name);

    this.departmentService.createDepartment(departmentData)
    .subscribe(
      (response) => {
        console.log('Department added:', response);
        console.log(departmentData);
        console.log(this.newDepartment.value.name);
        alert('This is working!');
      },
      (error) => {
        console.log(departmentData);
        console.log(this.newDepartment.value.name);
        console.error('Error adding request:', error);
      }
    );
  }



}

