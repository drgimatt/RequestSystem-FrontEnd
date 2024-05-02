import { Component, OnInit } from '@angular/core';
import { Request } from '../model/request';
import { Account } from '../model/account';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RequestService } from '../service/request.service';
import { Employee } from '../model/employee';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-final-dash',
  templateUrl: './final-dash.component.html',
  styleUrl: './final-dash.component.css'
})
export class FinalDashComponent implements OnInit{
  requests: Request[] = [];
  filteredRequests: Request[] = [];
  isDataLoaded: boolean = false;
  account: Account;
  user: Employee;
  filterTable: FormGroup;
  searchTable: FormGroup;

  constructor(private requestService: RequestService, private router: Router, private dataService: DataService, private fb: FormBuilder) {
    this.filterTable = this.fb.group({
      tableView : ''
    });
    this.searchTable = this.fb.group({
      searchView : ''
    });
  }

  ngOnInit(): void {
    this.user = this.dataService.getDataPersistent('model');
    this.account = this.dataService.getDataPersistent('account');
    // this.accountCheck();
    this.prepareRelevantRequests()
  }

  prepareRelevantRequests(){
    this.requestService.getRequests().subscribe((data: Request[]) => {
      this.requests = data
      this.filteredRequests = data
      this.isDataLoaded = true;
    });
  }

  onSignOut() {
    this.dataService.removeDataPersistent('model');
    this.dataService.removeDataPersistent('account');
    this.router.navigate(['/index']);
  }

  viewRequest(requestID: number){
    this.router.navigate(['/view-request/',requestID]);
  }

  clearSearch() {
    const inputField = document.getElementById('searchInput') as HTMLInputElement;
    if (inputField) {
        inputField.value = ''; // Clear the value of the input field
        this.searchTable.get('searchView').setValue(''); // Clear the value of the form control
    }

    // Reset filteredRequests array to its original state

}

  applySearch(){
    const searchValue = this.searchTable.get('searchView').value.toLowerCase().trim();
    this.filterTable.get('tableView').setValue('ALL')
    console.log("Value = ", searchValue)
    if (searchValue == "") {
      this.filteredRequests = this.requests;
    }
    else {
    // Filter the requests based on search input value
    this.filteredRequests = this.requests.filter(request =>
        // Modify the condition based on the fields you want to search
        request.student.firstName.toLowerCase().trim().includes(searchValue) ||
        request.student.lastName.toLowerCase().trim().includes(searchValue) ||
        request.subject.courseCode.toLowerCase().trim().includes(searchValue) ||
        request.student.studentID.toString().trim().includes(searchValue) ||
        request.advisingType.name.toLowerCase().trim().includes(searchValue) ||
        request.status.name.toLowerCase().trim().includes(searchValue)
        // Add more conditions if needed
        // Example: request.advisingType.name.toLowerCase().includes(searchValue)
    );}
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


  // accountCheck(){
  //   if (this.account == null || this.user == null || this.account.role.roleName === "PROFESSOR" || this.account.role.roleName === "STUDENT"){ 
  //     this.router.navigate(['index']);
  //   }
  // }
}