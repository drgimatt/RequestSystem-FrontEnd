import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { Account } from '../model/account';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 
})
export class LoginComponent {
  accountCheck: FormGroup;
  account : Account;
  errorMessage: string; 
  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router, private dataService: DataService) {
    this.accountCheck = this.fb.group({
      username: '',
      password: '',
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
          if (this.account.role.roleName === "ADMINISTRATION") {
            this.dataService.setDataPersistent('account', this.account);
            this.router.navigate(['/admin-dashboard']);
          } else if (this.account.role.roleName === "PROFESSOR") {
            this.dataService.setDataPersistent('account', this.account);
            this.router.navigate(['/professor-dashboard']);
          } else if (this.account.role.roleName === "STUDENT") {
            this.dataService.setDataPersistent('account', this.account);
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

}
