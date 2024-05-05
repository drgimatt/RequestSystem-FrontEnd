import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { StudentService } from '../service/student.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DepartmentService } from '../service/department.service';
import { Department } from '../model/department';
import { Student } from '../model/student';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit{

  newStudent: FormGroup;
  student : Student;
  selectedFile : File;
  selectedFileName: string; 
  departmentList: Department[] = [];
  isDataLoaded: boolean = false;
  forEditing: boolean = false;
  showOtherTextbox: boolean = false;

constructor(private departmentService: DepartmentService, private studentService: StudentService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe){
  this.newStudent = this.fb.group({
    studentID: ['', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
    firstName: ['', [Validators.required]],
    middleName: ['', [Validators.required]],
    lastName:['', [Validators.required]],
    program: ['', [Validators.required]],
    department: 0,
    yearLevel: 0,
    email: ['', [Validators.required, Validators.email]],
    gender: '',
    otherGender: '',    
    photo: null,
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
  this.route.params.forEach((params: Params) => {  
      if (params['id'] !== undefined) {
        this.forEditing = true;
        this.newStudent.get('');
        const id = params['id'];
        this.studentService.getStudent(id).subscribe(data => {
          this.student = data;
          this.initializeForm();
        });
      } 

  }); 
  
  }

  initializeForm() {

    this.newStudent = this.fb.group({
      studentID: this.student.studentID,
      firstName: this.student.firstName,
      middleName: this.student.middleName,
      lastName: this.student.lastName,
      program: this.student.program,
      department: this.student.department.id,
      yearLevel: this.student.yearLevel,
      email: this.student.email,
      gender: this.student.gender,
      otherGender: this.student.gender,    
      photo: this.student.photo,
    });
    this.selectedFile = this.createPhoto(this.student.photo)
    this.selectedFileName = this.selectedFile.name
    if(this.student.gender != "Male" && this.student.gender != "Female"){
      this.showOtherTextbox = true;
      this.newStudent.get('gender').setValue('Other')
    }
      this.isDataLoaded = true;

  }

  onSubmit() {
    if (this.newStudent.valid) {
      // Form is valid, proceed with form submission
      this.onUpload();
    } else {
      // Form is invalid, display error message or handle accordingly
      alert('Please fill out all required fields and ensure correct formats.');
    }
  }

  createPhoto(photo: any){
    const blob = new Blob([photo], { type: 'image/jpeg' });
    const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
    return file;
  }

  onGenderChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'Other') {
      this.showOtherTextbox = true;
      this.newStudent.get('otherGender')?.setValidators(Validators.required);
    } else {
      this.showOtherTextbox = false;
      this.newStudent.get('otherGender')?.clearValidators();
      this.newStudent.get('otherGender')?.setValue('');
    }
    this.newStudent.get('otherGender')?.updateValueAndValidity();
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    // Format the date as "YYYY-MM-DD HH:mm:ss"
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    return formattedDate;
  }

onFileChanged(event){ 
  this.selectedFile = event.target.files[0];
  if (this.selectedFile) {
    this.selectedFileName = this.selectedFile.name;
  }
}

checkFields(): boolean {
  // Check form fields including email format
  if (this.newStudent.get('email').invalid) {
    alert('Please enter a valid email.');
    return false;
  }
  for (const controlName in this.newStudent.controls) {
    if (this.newStudent.get(controlName).hasError('required')) {
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

formatDate(date: Date): string {
  // Use DatePipe to format the date
  return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss')!;
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
  student.append('dateAdded', this.getCurrentDate());
  student.append('program', this.newStudent.value.program);
  student.append('department', this.newStudent.value.department.toString());
  student.append('email', this.newStudent.value.email);  
  if (this.showOtherTextbox === true){
    student.append('gender', this.newStudent.value.otherGender);
  } else {
    student.append('gender', this.newStudent.value.gender);
  }      
  student.append('yearLevel', this.newStudent.value.yearLevel.toString());
  this.studentService.createStudent(student)
  .subscribe(
    (response) => {
      console.log('Student added:', response);
      console.log(student);
      alert('Student has been added!');
      this.router.navigate(['/management']);
    },
    (error) => {
      console.log(student);
      console.log(student.get('photo'))
      console.error('Error adding student:', error);
    }
  );    
}

onEdit(){
  const student = new FormData();
  student.append('myId', this.student.myId.toString());
  student.append('photoBytes', this.selectedFile);
  student.append('studentID', this.newStudent.value.studentID);
  student.append('firstName', this.newStudent.value.firstName);
  student.append('middleName', this.newStudent.value.middleName);
  student.append('lastName', this.newStudent.value.lastName);
  student.append('dateAdded', this.formatDate(this.student.dateAdded));
  student.append('program', this.newStudent.value.program);
  student.append('department', this.newStudent.value.department.toString());
  student.append('email', this.newStudent.value.email);  
  if (this.showOtherTextbox === true){
    student.append('gender', this.newStudent.value.otherGender);
  } else {
    student.append('gender', this.newStudent.value.gender);
  }      
  student.append('yearLevel', this.newStudent.value.yearLevel.toString());
  this.studentService.updateStudent(this.student.myId, student)
  .subscribe(
    (response) => {
      console.log('Student updated:', response);
      console.log(student);
      alert('Student record has been updated!');
      this.router.navigate(['/management']);
    },
    (error) => {
      console.log(student);
      console.log(student.get('photoBytes'))
      console.error('Error updating student:', error);
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
