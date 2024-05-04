import { Component, OnInit } from '@angular/core';
import { Request } from '../model/request';
import { Account } from '../model/account';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RequestService } from '../service/request.service';
import { Employee } from '../model/employee';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Student } from '../model/student';
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
  account: Account;
  filterTable: FormGroup;
  searchTable: FormGroup;
  profStatus: FormGroup;
  completeCount: Number = 0
  pendingCount: Number = 0
  rejectedCount: Number = 0
  user: any

  constructor(private requestService: RequestService, private router: Router, private dataService: DataService, private fb: FormBuilder, private dialog: MatDialog) {
    this.filterTable = this.fb.group({
      tableView : ''
    });
    this.searchTable = this.fb.group({
      searchView : ''
    });
    this.profStatus = this.fb.group({
      filterView : ''
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
      this.requestService.getRequests().subscribe((data: Request[]) => {
      this.requests = data
      this.completeCount = this.requests.filter(request => request.status.name === "COMPLETED").length
      this.pendingCount = this.requests.filter(request => request.status.name === "PENDING").length
      this.rejectedCount = this.requests.filter(request => request.status.name === "REJECTED").length
      this.filteredRequests = this.requests
      this.isDataLoaded = true;
    });
  } else if (this.account.role.roleName === 'PROFESSOR'){
      this.requestService.getProfessorRequest(this.user.employeeID).subscribe((data: Request[]) => {
      this.requests = data
      this.completeCount = this.requests.filter(request => request.status.name === "COMPLETED").length
      this.pendingCount = this.requests.filter(request => request.status.name === "PENDING").length
      this.rejectedCount = this.requests.filter(request => request.status.name === "REJECTED").length
      this.filteredRequests = this.requests
      this.isDataLoaded = true;
    });
    }
    else if (this.account.role.roleName === 'STUDENT'){
      this.requestService.getRequests().subscribe((data: Request[]) => {
      this.requests = data.filter(request => request.student.studentID === this.user.studentID);
      this.completeCount = this.requests.filter(request => request.status.name === "COMPLETED").length
      this.pendingCount = this.requests.filter(request => request.status.name === "PENDING").length
      this.rejectedCount = this.requests.filter(request => request.status.name === "REJECTED").length
      this.filteredRequests = this.requests
      this.isDataLoaded = true;});
    }

  }

  onSignOut() {
    this.dataService.removeDataPersistent('model');
    this.dataService.removeDataPersistent('account');
    this.router.navigate(['/index']);
  }

  viewRequest(SpecificRequestID: number){

    this.SpecificRequest = this.filteredRequests.find(req => req.requestId === SpecificRequestID)

    if (this.account.role.roleName === "PROFESSOR" || this.account.role.roleName === "ADMINISTRATION"){
      this.router.navigate(['/modify-request/',SpecificRequestID]);
    } else if (this.account.role.roleName === "STUDENT" || (this.account.role.roleName === "ADMINISTRATION" && this.SpecificRequest.advisingType.name === "Mentoring / Clarification on the Topic of the Subjects Enrolled" || this.SpecificRequest.advisingType.name === "Requirements in Course Enrolled")){
      this.router.navigate(['/view-request/',SpecificRequestID]);
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
