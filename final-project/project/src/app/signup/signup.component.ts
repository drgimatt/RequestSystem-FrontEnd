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

  constructor(private studentService: StudentService, private employeeService: EmployeeService,private accountService: AccountService, private fb: FormBuilder, private router: Router) {
    this.newAccount = this.fb.group({
      userid: '',
      username: '',
      password: '',
      roleid: -1,
    });
  }
  ngOnInit(): void {
    this.studentService.getStudents().subscribe(res => {
      this.studentArray = res;
    })    

    this.employeeService.getEmployees().subscribe(res => {
      this.employeeArray = res;
    })
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    // Format the date as needed, for example: YYYY-MM-DD
    const formattedDate = currentDate.toISOString().slice(0, 10);
    return formattedDate;
  }



  createAccount() {
    const accountData = new FormData();
    accountData.append('username', this.newAccount.value.username);
    accountData.append('password', this.newAccount.value.password);
    accountData.append('dateCreated',this.getCurrentDate());
    accountData.append('userID',this.checkUserIsPresent());
    accountData.append('role',this.newAccount.value.roleid);
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
    );
  }


  checkPasswordMatch(): void {
    const password = (<HTMLInputElement>document.getElementById('password')).value;
    const confirmPassword = (<HTMLInputElement>document.getElementById('confirmPassword')).value;

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
    } else {
      this.createAccount();
      this.router.navigate(['/login']);
    }
  }

  checkUserIsPresent(): string {

      for (let i = 0; i <= this.studentArray.length; i++){
        if (this.newAccount.value.userid === this.studentArray[i].studentID){
          this.newAccount.patchValue({ roleid: '1' });  
          return this.newAccount.value.userid
        }
      }
      for (let i = 0; i <= this.employeeArray.length; i++){
        if (this.newAccount.value.userid === this.employeeArray[i].employeeID){
          this.newAccount.patchValue({ roleid: '2' }); 
          return this.newAccount.value.userid
        }
      }
      return null

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
