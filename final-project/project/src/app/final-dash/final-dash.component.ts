import { Component, OnInit } from '@angular/core';
import { Request } from '../model/request';
import { Account } from '../model/account';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RequestService } from '../service/request.service';
import { Employee } from '../model/employee';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Student } from '../model/student';
import { EmployeeService } from '../service/employee.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SignoutDialogComponent } from '../signout-dialog/signout-dialog.component';

@Component({
  selector: 'app-final-dash',
  templateUrl: './final-dash.component.html',
  styleUrl: './final-dash.component.css'
})
export class FinalDashComponent implements OnInit{
  requests: Request[] = [];
  SpecificRequest: Request;
  filteredRequests: Request[] = [];
  isDataLoaded: boolean = false;
  isDataEmpty: boolean = false;
  isLoadingFailed: boolean = false;
  account: Account;
  emp: Employee;
  filterTable: FormGroup;
  searchTable: FormGroup;
  profStatus: FormGroup;
  completeCount: Number = 0
  pendingCount: Number = 0
  rejectedCount: Number = 0
  user: any

  constructor(private datePipe: DatePipe,private requestService: RequestService, private employeeService: EmployeeService, private router: Router, private dataService: DataService, private fb: FormBuilder, private dialog: MatDialog) {
    this.filterTable = this.fb.group({
      tableView : ''
    });
    this.searchTable = this.fb.group({
      searchView : ''
    });
    this.profStatus = this.fb.group({
      statusView : ''
    });
  }

  ngOnInit(): void {
    this.user = this.dataService.getDataPersistent('model');
    this.account = this.dataService.getDataPersistent('account');
    
    //this.accountCheck();
    this.prepareRelevantRequests()
  }

  prepareRelevantRequests(){
    if(this.account.role.roleName === 'ADMINISTRATION') {
      this.employeeService.getEmployee(this.user.myId).subscribe ((data: Employee) => {
        this.emp = data
        this.profStatus.get('statusView')?.setValue(this.emp.status);
      })
      this.requestService.getRequests().subscribe((data: Request[]) => {
      this.requests = data
      this.completeCount = this.requests.filter(request => request.status.name === "COMPLETED").length
      this.pendingCount = this.requests.filter(request => request.status.name === "PENDING").length
      this.rejectedCount = this.requests.filter(request => request.status.name === "REJECTED").length
      this.filteredRequests = this.requests
      this.isDataLoaded = true;
      if(this.requests.length === 0) {
        this.isDataEmpty = true
      }
    },(error) => {
      this.isLoadingFailed = true;
    });
    } else if (this.account.role.roleName === 'PROFESSOR'){
        this.employeeService.getEmployee(this.user.myId).subscribe ((data: Employee) => {
          this.emp = data
          this.profStatus.get('statusView')?.setValue(this.emp.status);
        })
        this.requestService.getProfessorRequest(this.user.employeeID).subscribe((data: Request[]) => {
        this.requests = data
        this.completeCount = this.requests.filter(request => request.status.name === "COMPLETED").length
        this.pendingCount = this.requests.filter(request => request.status.name === "PENDING").length
        this.rejectedCount = this.requests.filter(request => request.status.name === "REJECTED").length
        this.filteredRequests = this.requests
        this.isDataLoaded = true;
        if(this.requests.length === 0) {
          this.isDataEmpty = true
        }
      },(error) => {
        this.isLoadingFailed = true;
      });
    } else if (this.account.role.roleName === 'STUDENT'){
      this.requestService.getRequests().subscribe((data: Request[]) => {
      this.requests = data.filter(request => request.student.studentID === this.user.studentID);
      this.completeCount = this.requests.filter(request => request.status.name === "COMPLETED").length
      this.pendingCount = this.requests.filter(request => request.status.name === "PENDING").length
      this.rejectedCount = this.requests.filter(request => request.status.name === "REJECTED").length
      this.filteredRequests = this.requests
      this.isDataLoaded = true;
      if(this.requests.length === 0) {
        this.isDataEmpty = true
      }
    },(error) => {
      this.isLoadingFailed = true;
    });
      
    }

    
  }

  onSignOut() {
    this.dataService.removeDataPersistent('model');
    this.dataService.removeDataPersistent('account');
    this.router.navigate(['/index']);
  }

  viewRequest(SpecificRequestID: number){

    this.SpecificRequest = this.filteredRequests.find(req => req.requestId === SpecificRequestID)

    if (this.account.role.roleName === "STUDENT" || (this.account.role.roleName === "ADMINISTRATION" && this.SpecificRequest.advisingType.name === "Mentoring / Clarification on the Topic of the Subjects Enrolled" || this.account.role.roleName !== "PROFESSOR" && this.SpecificRequest.advisingType.name === "Requirements in Course Enrolled")){
      this.router.navigate(['/view-request/',SpecificRequestID]);
    } else if (this.account.role.roleName === "PROFESSOR" || this.account.role.roleName === "ADMINISTRATION"){
      this.router.navigate(['/modify-request/',SpecificRequestID]);
    } 
    
  }

  clearSearch() {
    const inputField = document.getElementById('searchInput') as HTMLInputElement;
    if (inputField) {
        inputField.value = ''; // Clear the value of the input field
        this.searchTable.get('searchView').setValue(''); // Clear the value of the form control
    }

    // Reset filteredRequests array to its original state

}

formatDate(date: Date): string {
  // Use DatePipe to format the date
  return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss')!;
}

  applyStatus(event: any){
    const selectedValue = event.target.value;
    const user = new FormData();
    user.append('myId', this.emp.myId.toString());
    user.append('employeeID', this.emp.employeeID)
    user.append('firstName', this.emp.firstName)
    user.append('lastName', this.emp.lastName)
    user.append('middleName', this.emp.middleName)
    user.append('position', this.emp.position)
    user.append('department', this.emp.department.id.toString())
    user.append('email', this.emp.email)
    user.append('gender', this.emp.gender)
    user.append('dateAdded', this.formatDate(this.emp.dateAdded))
    user.append('status', selectedValue)
    this.employeeService.updateEmployee(this.emp.myId, user).subscribe();
  }


  applySearch(event: any){
    const searchValue = event.target.value;
    this.filterTable.get('tableView').setValue('ALL')
    console.log("Value = ", searchValue)
    if (searchValue == "") {
      this.filteredRequests = this.requests;
    }
    else {
      // Filter the requests based on search input value
      this.filteredRequests = this.requests.filter(request => {
          // Modify the condition based on the fields you want to search
          const student = request.student;
          const subject = request.subject;
          const advisingType = request.advisingType;
          const status = request.status;
          
          // Ensure that all required properties are not null before accessing their properties
          return (student && student.firstName.toLowerCase().includes(searchValue)) ||
                 (student && student.lastName.toLowerCase().includes(searchValue)) ||
                 (student && student.studentID.toString().includes(searchValue)) ||
                 (subject && subject.courseCode.toLowerCase().includes(searchValue)) ||
                 (advisingType && advisingType.name.toLowerCase().includes(searchValue)) ||
                 (status && status.name.toLowerCase().includes(searchValue));
      });
  }
  }

  applyFilter(event: any) {
    const selectedValue = event.target.value;
    this.clearSearch();
    //this.clearSearch();
        if (selectedValue === 'ALL') {
        // Reset the requests array to its original state
        // Or fetch the requests again from the server
        // (This assumes that you have a copy of all requests)
        this.filteredRequests = this.requests;
    } else {
        // Filter requests based on the selected value
        this.filteredRequests = this.requests.filter(request =>
            request.status.name === selectedValue
        );
    }
}

  sortRequestsAlphabetically() {
    this.requests.sort((a, b) => {
      // Use the localeCompare method to compare reuqest names in a case-insensitive manner
      return null
      //return a.priority.name.localeCompare(b.priority.name, undefined, { sensitivity: 'base' });
    });
  }  


  accountCheck(){
    if (this.account == null || this.user == null  ){ 
      this.dataService.removeDataPersistent('model');
      this.dataService.removeDataPersistent('account');
      this.router.navigate(['index']);
    }
  }

  // for the dialog box
  openDialog(): void {
    const dialogRef = this.dialog.open(SignoutDialogComponent, {
      width: '350px',
      height: '200px'
    });

    dialogRef.afterClosed().subscribe((result)=> {
      console.log("dialog has been closed");
    });
  }
}
