import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../service/student.service';
import { Router } from '@angular/router';
import { DepartmentService } from '../service/department.service';
import { Department } from '../model/department';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit{

  newStudent: FormGroup;
  selectedFile : File;
  selectedFileName: string; 
  departmentList: Department[] = [];
  isDataLoaded: boolean = false;

constructor(private departmentService: DepartmentService, private studentService: StudentService, private fb: FormBuilder, private router: Router){
  this.newStudent = this.fb.group({
    studentID: '',
    firstName: '',
    middleName: '',
    lastName: '',
    program: '',
    department: 0,
    yearLevel: 0,
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
  
  }


onFileChanged(event){ 
  this.selectedFile = event.target.files[0];
  if (this.selectedFile) {
    this.selectedFileName = this.selectedFile.name;
  }
}

checkFields(): boolean {
  for (const controlName in this.newStudent.controls) {
    if (this.newStudent.get(controlName).hasError('required')) {
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
  const student = new FormData();
  student.append('photoBytes', this.selectedFile);
  student.append('studentID', this.newStudent.value.studentID);
  student.append('firstName', this.newStudent.value.firstName);
  student.append('middleName', this.newStudent.value.middleName);
  student.append('lastName', this.newStudent.value.lastName);
  student.append('program', this.newStudent.value.program);
  student.append('department', this.newStudent.value.department.toString());
  student.append('gender', this.newStudent.value.gender);
  student.append('email', this.newStudent.value.email);        
  student.append('yearLevel', this.newStudent.value.yearLevel.toString());
  this.studentService.createStudent(student)
  .subscribe(
    (response) => {
      console.log('Student added:', response);
      console.log(student);
      alert('This is working!');
    },
    (error) => {
      console.log(student);
      console.log(student.get('photo'))
      console.error('Error adding request:', error);
    }
  );    
}




}
