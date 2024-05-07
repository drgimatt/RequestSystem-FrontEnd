import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { Account } from '../model/account';
import { DataService } from '../data.service';
import { Student } from '../model/student';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee.service';
import { StudentService } from '../service/student.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

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
  constructor(private employeeService: EmployeeService, private studentService: StudentService, private accountService: AccountService, private fb: FormBuilder, private router: Router, private dataService: DataService, private renderer: Renderer2) {
    this.accountCheck = this.fb.group({
      username: '',
      password: '',
    });
  }
  ngOnInit(): void {
    this.loadBootstrapCSS();
    this.loadBootstrapJS();
    this.studentService.getStudents().subscribe((data: Student[]) => {
      this.studentArray = data;
    });
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employeeArray = data;
    });
  }

  loadBootstrapCSS() {
    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'href', 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css');
    this.renderer.setAttribute(link, 'rel', 'stylesheet');
    document.head.appendChild(link);
  }

  loadBootstrapJS() {
    const script = this.renderer.createElement('script');
    this.renderer.setAttribute(script, 'src', 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.min.js');
    document.body.appendChild(script);
  }

  checkUser(){

    this.accountService.checkAccount(this.accountCheck.value.username, this.accountCheck.value.password).subscribe(
        
      (account: Account) => {
        // Handle successful response
        this.account = account;
        // when this is uncommented, di nakakarating sa last else statement
        // console.log('Username: ',this.account.username);
        // console.log('Password: ', this.account.password);
        // console.log('Account Type ID: ', this.account.role.myId);
        // console.log('Account Type Name: ', this.account.role.roleName);
        // console.log('Received account:', this.account);
        // console.log('Username:', this.account ? this.account.username : null);
        // console.log('Password:', this.account ? this.account.password : null);
        // console.log('Role:', this.account && this.account.role ? this.account.role : null);
        if (this.account && this.account.role) {
          this.dataService.setDataPersistent('account', this.account);
          if (this.account.role.roleName === "ADMINISTRATION" || this.account.role.roleName === "PROFESSOR") {
            this.getPersonModel("EMPLOYEE");
            this.router.navigate(['/dashboard']);
          } else if (this.account.role.roleName === "STUDENT") {
            this.errorMessage = "Credentials used are for students. Please use the student login page.";
            this.accountCheck.get('username')?.setValue('');
            this.accountCheck.get('password')?.setValue('');
          }
        } else {
          // Handle the case when 'account' is null or 'role' is not defined
          this.errorMessage = 'Invalid credentials. Please try again.';
          this.accountCheck.get('username')?.setValue('');
          this.accountCheck.get('password')?.setValue('');
        }
      },
      (error) => {
        // Handle error and set the error message
        console.error('Error: ', error);
        this.errorMessage = 'Login failed. Please check your username and password.';
        this.accountCheck.get('username')?.setValue('');
        this.accountCheck.get('password')?.setValue('');
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
