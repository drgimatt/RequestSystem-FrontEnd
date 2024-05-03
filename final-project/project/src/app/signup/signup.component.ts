import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class SignupComponent implements OnInit {
  studentArray: Student[];
  employeeArray: Employee[];
  newAccount: FormGroup;
  isDataLoaded: boolean = false;
  isUserPresent: boolean = false;

  constructor(
    private studentService: StudentService,
    private employeeService: EmployeeService,
    private accountService: AccountService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.newAccount = this.fb.group({
      userid: ['', [Validators.required, Validators.maxLength(10)]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(11), Validators.pattern('[0-9]+')]],
      birthDate: [new Date(), Validators.required],
      roleid: [-1, Validators.required],
      confirmPassword: ['', Validators.required]
    });
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
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    // Format the date as "YYYY-MM-DD HH:mm:ss"
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    return formattedDate;
  }

  createAccount(): void {
    const accountData = new FormData();
    this.checkUserIsPresent();
    accountData.append('username', this.newAccount.value.username);
    accountData.append('password', this.newAccount.value.password);
    accountData.append('dateCreated', this.getCurrentDate());
    accountData.append('userID', this.newAccount.value.userid);
    accountData.append('phoneNumber', this.newAccount.value.phoneNumber);
    accountData.append('birthDate', this.newAccount.value.birthDate.toString());
    accountData.append('role', this.newAccount.value.roleid.toString());

    if (this.isUserPresent) {
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
