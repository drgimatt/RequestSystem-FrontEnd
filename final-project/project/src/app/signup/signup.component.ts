import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { StudentService } from '../service/student.service';
import { EmployeeService } from '../service/employee.service';
import { Student } from '../model/student';
import { Employee } from '../model/employee';
import { Account } from '../model/account';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  studentArray: Student[];
  employeeArray: Employee[];
  accountArray: Account[];
  newAccount: FormGroup;
  isDataLoaded: boolean = false;
  isUserPresent: boolean = false;
  accountError: string = "";
  isCreatorEmployee: boolean = false;
  isCreatorStudent: boolean = false;

  constructor(
    private studentService: StudentService,
    private employeeService: EmployeeService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.newAccount = this.fb.group({
      userid: ['', [Validators.required, Validators.minLength(10)]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/[!@#$%^&*(),.?=":{}|<>]/)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.pattern('[0-9]+')]],
      birthDate: [new Date(), Validators.required],
      roleid: [-1, Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  updateUsernameValidator(): void {
    const usernameControl = this.newAccount.get('username');
    if (this.isCreatorStudent) {
      // Disable Validators.required if creator is student
      usernameControl.clearValidators();
      usernameControl.updateValueAndValidity();
    } else {
      // Enable Validators.required if creator is not student
      usernameControl.setValidators([Validators.required]);
      usernameControl.updateValueAndValidity();
    }
}
  
  ngOnInit(): void {
    this.isDataLoaded = true;
    this.studentService.getStudents().subscribe(res => {
      this.studentArray = res;
      if (res.length === 0) {
        this.isDataLoaded = false;
      }
    });

    this.employeeService.getEmployees().subscribe(res => {
      this.employeeArray = res;
      if (res.length === 0) {
        this.isDataLoaded = false;
      }
    });

    this.accountService.getAccounts().subscribe(
      (response) => {
          this.accountArray = response
      },
      (error) => {
          this.isDataLoaded = false;
      }
    );
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    // Format the date as "YYYY-MM-DD HH:mm:ss"
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    return formattedDate;
  }

  checkUserType(event: any) {
    const userID = event.target.value;
    this.isUserPresent = false;
    this.isCreatorEmployee = false;
    this.isCreatorStudent = false;
    let isUserFound = false; // Flag to track if user is found in either array
    console.log('Input value changed: ', userID);

    // Check student array
    if (this.studentArray && this.studentArray.length !== 0) {
        for (let i = 0; i < this.studentArray.length; i++) {
            if (userID === this.studentArray[i].studentID) {
                this.isUserPresent = true;
                this.isCreatorStudent = true
                this.isCreatorEmployee = false;
                isUserFound = true; // Set flag to true if user is found
                break;
            }
        }
    }

    // Check employee array if user is not found in student array
    if (!isUserFound && this.employeeArray && this.employeeArray.length !== 0) {
        for (let i = 0; i < this.employeeArray.length; i++) {
            if (userID === this.employeeArray[i].employeeID) {
                this.isUserPresent = true;
                this.isCreatorEmployee = true;
                this.isCreatorStudent = false
                isUserFound = true; // Set flag to true if user is found
                break;
            }
        }
    }

    // If user is not found in either array, set error message
    if (!isUserFound) {
        this.accountError = "Invalid ID.";
    } else {
        this.accountError = ""; // Reset error message if user is found
    }

    this.updateUsernameValidator()
}

  
  doesAccountExists() {

    for (let i = 0; i < this.accountArray.length; i++) {
      if (this.newAccount.value.username === this.accountArray[i].username) {

          this.accountError = "Username already exists!"
          return true;

      } else if (this.newAccount.value.userid === this.accountArray[i].userID){
  
          this.accountError = "Account number is already registered! Please login instead."
          return true;
      }
    }
    return false;
  }


  createAccount(): void {
    const accountData = new FormData();
    this.checkUserIsPresent();
    if (this.isCreatorEmployee) {
      accountData.append('username', this.newAccount.value.username);
    } else {
      accountData.append('username', this.newAccount.value.userid);
    }
    accountData.append('password', this.newAccount.value.password);
    accountData.append('dateCreated', this.getCurrentDate());
    accountData.append('userID', this.newAccount.value.userid);
    accountData.append('phoneNumber', this.newAccount.value.phoneNumber);
    accountData.append('birthDate', this.newAccount.value.birthDate.toString());
    accountData.append('role', this.newAccount.value.roleid.toString());

    if (this.isUserPresent) {
      if (this.doesAccountExists() === false) {
        this.accountService.createAccount(accountData).subscribe(
          (response) => {
            console.log('Account added:', response);
            console.log('UserID: ', this.newAccount.value.userid);
            alert('Account created successfully!');
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Error adding request:', error);
            alert('Error creating account. Please try again later.');
          }
        );
      } else {
          alert(this.accountError)
      }

    } else {
      alert('User ID is invalid.');
    }
  }

  checkPasswordMatch(): void {
    const password = this.newAccount.value.password;
    const confirmPassword = this.newAccount.value.confirmPassword;

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
    } else {
      this.createAccount();
    }
  }

  checkUserIsPresent(): void {
    this.isUserPresent = false;

    if (this.studentArray && this.studentArray.length !== 0) {
      for (let i = 0; i < this.studentArray.length; i++) {
        if (this.newAccount.value.userid === this.studentArray[i].studentID) {
          this.newAccount.patchValue({ roleid: '3' });
          this.isUserPresent = true;
          break;
        }
      }
    }

    if (this.employeeArray && this.employeeArray.length !== 0) {
      for (let i = 0; i < this.employeeArray.length; i++) {
        if (this.newAccount.value.userid === this.employeeArray[i].employeeID) {
          if (this.employeeArray[i].position === 'Professor') {
            this.newAccount.patchValue({ roleid: '2' });
          } else {
            this.newAccount.patchValue({ roleid: '1' });
          }
          this.isUserPresent = true;
          break;
        }
      }
    }
  }

  checkFields(): void {
    if (this.newAccount.valid) {
      this.checkPasswordMatch();
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
}
