import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { StudentService } from '../service/student.service';
import { EmployeeService } from '../service/employee.service';
import { Student } from '../model/student';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  studentArray: Student[];
  employeeArray: Array<Employee>;
  newAccount: FormGroup;
  isDataLoaded: boolean = false;
  isUserPresent: boolean = false;

  constructor(private studentService: StudentService, private employeeService: EmployeeService, private accountService: AccountService, private fb: FormBuilder, private router: Router) {
    this.newAccount = this.fb.group({
      userid: '',
      username: '',
      password: '',
      roleid: -1,
    });
  }
  ngOnInit(): void {
    this.isDataLoaded = true;
    this.studentService.getStudents().subscribe(res => {
      this.studentArray = res;
      if(res.length === 0) {
        this.isDataLoaded = false;
      }
    })    

    this.employeeService.getEmployees().subscribe(res => {
      this.employeeArray = res;
      if(res.length === 0) {
        this.isDataLoaded = false;
      }
    } 
  )
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    // Format the date as needed, for example: YYYY-MM-DD
    const formattedDate = currentDate.toISOString().slice(0, 10);
    return formattedDate;
  }



  createAccount() {
    const accountData = new FormData();
    this.checkUserIsPresent();
    accountData.append('username', this.newAccount.value.username);
    accountData.append('password', this.newAccount.value.password);
    accountData.append('dateCreated',this.getCurrentDate());
    accountData.append('userID',this.newAccount.value.userid);
    accountData.append('role',this.newAccount.value.roleid);
    if (this.isUserPresent){    
      this.accountService.createAccount(accountData)
      .subscribe(
        (response) => {
          console.log('Account added:', response);
          console.log('UserID: ',this.newAccount.value.userid);
          alert('This is working!');
        },
        (error) => {
          console.error('Error adding request:', error);
        }
      );}
      else {
        alert ('ID entered is invalid');
      }
  }


  checkPasswordMatch(): void {
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    const confirmPassword = (<HTMLInputElement>document.getElementById('confirmPassword')).value;

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
    } else {
      this.createAccount();
      //this.router.navigate(['/login']);
    }
  }

  checkUserIsPresent(): void {

    if (this.studentArray.length !== 0)  {
      if (!this.isUserPresent){    
        for (let i = 0; i < this.studentArray.length; i++){
          if (this.newAccount.value.userid === this.studentArray[i].studentID){
            this.newAccount.patchValue({ roleid: '3' });
            this.isUserPresent = true;
            break;  
          }
      }}

    } 
    if (this.employeeArray.length !== 0) {
      if(!this.isUserPresent){
        for (let i = 0; i < this.employeeArray.length; i++){
          if (this.newAccount.value.userid === this.employeeArray[i].employeeID){
            this.newAccount.patchValue({ roleid: '2' }); 
            this.isUserPresent = true;
            break;
        }
      }
    }
    } 

  }


  checkFields(): boolean {
    for (const controlName in this.newAccount.controls) {
      if (this.newAccount.get(controlName).hasError('required')) {
        alert('Please fill-out all the required fields.');
        return false;
      }
    }
    this.checkPasswordMatch();
    return true;
  }

}
