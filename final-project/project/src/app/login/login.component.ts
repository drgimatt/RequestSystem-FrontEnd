import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { Account } from '../model/account';
import { DataService } from '../data.service';
import { Student } from '../model/student';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 
})
export class LoginComponent implements OnInit{
  accountCheck: FormGroup;
  account : Account;
  errorMessage: string; 
  studentArray: Student[];
  employeeArray: Employee[];
  constructor(private employeeService: EmployeeService, private studentService: StudentService, private accountService: AccountService, private fb: FormBuilder, private router: Router, private dataService: DataService) {
    this.accountCheck = this.fb.group({
      username: '',
      password: '',
    });
  }
  ngOnInit(): void {
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.studentArray = data;
    });
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employeeArray = data;
    });
  }

  checkUser(){

    this.accountService.checkAccount(this.accountCheck.value.username, this.accountCheck.value.password).subscribe(
        
      (account: Account) => {
        // Handle successful response
        this.account = account;
        console.log('Username: ',this.account.username);
        console.log('Password: ', this.account.password);
        console.log('Account Type ID: ', this.account.role.myId);
        console.log('Account Type Name: ', this.account.role.roleName);
        if (this.account && this.account.role) {
          this.dataService.setDataPersistent('account', this.account);
          if (this.account.role.roleName === "ADMINISTRATION") {
            this.getPersonModel("EMPLOYEE");
            this.router.navigate(['/admin-dashboard']);
          } else if (this.account.role.roleName === "PROFESSOR") {
            this.getPersonModel("EMPLOYEE");
            this.router.navigate(['/professor-dashboard']);
          } else if (this.account.role.roleName === "STUDENT") {
            this.getPersonModel("STUDENT");
            this.router.navigate(['/student-dashboard']);
          }
          else{
            this.errorMessage = "Role is not being checked " + account.role;
          }
        } else {
          // Handle the case when 'account' is null or 'role' is not defined
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      },
      (error) => {
        // Handle error and set the error message
        console.error('Error: ', error);
        this.errorMessage = 'Login failed. Please check your username and password.';
      }
    );


    }

    navigateToHome() {
      this.router.navigate(['index']);
    }

    getPersonModel(Type: string){
      if(Type === "STUDENT"){  
            for (let i = 0; i < this.studentArray.length; i++){
              if (this.account.userID === this.studentArray[i].studentID){
                this.dataService.setDataPersistent('model', this.studentArray[i]);
                break;  
              }
          }
      } if(Type === "EMPLOYEE"){  
        for (let i = 0; i < this.employeeArray.length; i++){
          if (this.account.userID === this.employeeArray[i].employeeID){
            this.dataService.setDataPersistent('model', this.employeeArray[i]);
            break;  
          }
      }
      
    }
  }
}
