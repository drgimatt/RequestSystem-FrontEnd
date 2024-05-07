import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Department } from '../model/department';
import { Subjects } from '../model/subjects';
import { DepartmentService } from '../service/department.service';
import { SubjectsService } from '../service/subjects.service';
import { DatePipe } from '@angular/common';
import { Employee } from '../model/employee';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogService } from '../service/add-dialog.service';
import { Student } from '../model/student';
import { StudentService } from '../service/student.service';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit{
  action:string;
  newEmployee: FormGroup;
  employee: Employee
  departmentList: Department[] = [];
  subjectsList: Subjects[] = [];
  studentArray: Student[] = [];
  employeeArray: Employee[] = [];
  isDataLoaded: boolean = false;
  subjects = new FormControl('');
  showOtherTextbox: boolean = false;
  forEditing: boolean = false;
  isUserPresent: boolean = true;
  counter: number = -1;

constructor(private departmentService: DepartmentService, private subjectService: SubjectsService, private employeeService: EmployeeService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private dialog: MatDialog, private shared:AddDialogService, private studentService: StudentService){
  this.newEmployee = this.fb.group({
    employeeID: ['', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]+$'), this.isIDPresent()]],
    firstName: ['',[Validators.required]],
    middleName: ['',[Validators.required]],
    lastName: ['',[Validators.required]],
    position: ['',[Validators.required]],
    department: 1,
    email: ['', [Validators.required, Validators.email]],
    gender:['Male',[Validators.required]],
    otherGender:'',  
    status: ''
  })

}
  ngOnInit(): void {
    this.shared.currentAction.subscribe(action => this.action = action);
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

    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employeeArray = data;
      this.isDataLoaded = true;
    },
    (error) => {
      this.isDataLoaded = false;
    }
  );

    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.studentArray = data;
      this.isDataLoaded = true;
    },
    (error) => {
      this.isDataLoaded = false;
    }
  );  

    this.route.params.forEach((params: Params) => {  
      if (params['id'] !== undefined) {
        this.forEditing = true;
        this.newEmployee.get('');
        const id = params['id'];
        this.employeeService.getEmployee(id).subscribe(data => {
          this.employee = data;
          this.initializeForm();
        });
      } 

  }); 

  }

  isIDPresent(){
    return (control: FormControl) => {
      const userID = control.value;
      console.log('UserID: ', userID)
      console.log('counter: ', this.counter)

  
      if (userID !== '' && this.isUserPresent === true && this.counter !== 2) {
        return { conflictID: true };
      }

      this.counter++;
      console.log('counter: ', this.counter)
      // Return null if validation succeeds
      return { conflictID: false };
      
    };
  }

  checkUserType(event: any) {
    const userID = event.target.value;
    this.isUserPresent = false;
    // console.log('Input value changed: ', userID);

    // Check student array
    if (this.studentArray && this.studentArray.length !== 0) {
        for (let i = 0; i < this.studentArray.length; i++) {
            if (userID === this.studentArray[i].studentID) {
                this.isUserPresent = true;
                break;
            }
        }
    }

    // Check employee array if user is not found in student array
    if (!this.isUserPresent && this.employeeArray && this.employeeArray.length !== 0) {
        for (let i = 0; i < this.employeeArray.length; i++) {
            if (userID === this.employeeArray[i].employeeID) {
                this.isUserPresent = true;
                break;
            }
        }
    }

    if(userID === ''){
      this.isUserPresent = true;
    }


}


  initializeForm() {

    // this.newStudent = this.fb.group({
    //   studentID: this.student.studentID,
    //   firstName: this.student.firstName,
    //   middleName: this.student.middleName,
    //   lastName: this.student.lastName,
    //   program: this.student.program,
    //   department: this.student.department.id,
    //   yearLevel: this.student.yearLevel,
    //   email: this.student.email,
    //   gender: this.student.gender,
    //   otherGender: this.student.gender,    
    //   photo: this.student.photo,
    // });

    this.newEmployee = this.fb.group({
      employeeID: [this.employee.employeeID, [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]+$')]],
      firstName: [this.employee.firstName,[Validators.required]],
      middleName: [this.employee.middleName,[Validators.required]],
      lastName: [this.employee.lastName,[Validators.required]],
      position: [this.employee.position,[Validators.required]],
      department: this.employee.department.id,
      email: [this.employee.email, [Validators.required, Validators.email]],
      gender:[this.employee.gender,[Validators.required]],
      otherGender: [this.employee.gender,[Validators.required]],    
      status: this.employee.status
    })
    this.newEmployee.get('employeeID').disable()
    if(this.employee.gender != "Male" && this.employee.gender != "Female"){
      this.showOtherTextbox = true;
      this.newEmployee.get('gender').setValue('Other')
    }
      this.isDataLoaded = true;

  }


  onSubmit() {
    if (this.newEmployee.valid && this.forEditing === false) {
      // Form is valid, proceed with form submission
      this.onUpload();
    } else if (this.newEmployee.valid && this.forEditing === true) {
      this.onEdit();
    } else {
      // Form is invalid, display error message or handle accordingly
      alert('Please fill out all required fields and ensure correct formats.');
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

formatDate(date: Date): string {
  // Use DatePipe to format the date
  return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss')!;
}

getCurrentDate(): string {
  const currentDate = new Date();
  // Format the date as "YYYY-MM-DD HH:mm:ss"
  const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
  return formattedDate;
}

onUpload(){
  const employee = new FormData();
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
  employee.append('email', this.newEmployee.value.email);        
  this.employeeService.createEmployee(employee)
  .subscribe(
    (response) => {
      console.log('Employee added:', response);
      console.log(employee);
      alert('Employee record has been added!');
      this.router.navigate(['/employee-page']);
    },
    (error) => {
      console.log(employee);
      console.log(employee.get('photo'))
      console.error('Error adding request:', error);
    }
  );    
}

onEdit(){
  const employee = new FormData();
  employee.append('myId', this.employee.myId.toString())
  employee.append('employeeID', this.employee.employeeID);
  employee.append('firstName', this.newEmployee.value.firstName);
  employee.append('middleName', this.newEmployee.value.middleName);
  employee.append('lastName', this.newEmployee.value.lastName);
  employee.append('position', this.newEmployee.value.position);
  employee.append('dateAdded', this.formatDate(this.employee.dateAdded))
  employee.append('department', this.newEmployee.value.department.toString());
  employee.append('status', this.newEmployee.value.status)
  if (this.showOtherTextbox === true){
    employee.append('gender', this.newEmployee.value.otherGender);
  } else {
    employee.append('gender', this.newEmployee.value.gender);
  }
  employee.append('email', this.newEmployee.value.email);        
  this.employeeService.updateEmployee(this.employee.myId,employee)
  .subscribe(
    (response) => {
      console.log('Employee updated:', response);
      console.log(employee);
      alert('Employee record has been updated!');
      this.router.navigate(['/employee-page']);
    },
    (error) => {
      console.log(employee);
      console.log(employee.get('photo'))
      console.error('Error updating request:', error);
    }
  );    
}
// for the dialog box
openDialog(): void {
  const dialogRef = this.dialog.open(AddDialogComponent, {
    width: '400px',
    height: '250px'
  });
  dialogRef.afterClosed().subscribe((result)=> {
    if (this.action === 'confirm') {
      // Proceed with form submission
      if(this.forEditing === false) {
        this.onSubmit();
      }
      else {
        this.onEdit();
      }
    } else {
      console.log("Dialog canceled or closed without confirmation.");
      this.action = "";
    }
  });
}

}

export function emailFormat(control: AbstractControl): { [key: string]: boolean } | null {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (control.value && !emailPattern.test(control.value)) {
    return { 'emailFormat': true };
  }
  return null;
}
