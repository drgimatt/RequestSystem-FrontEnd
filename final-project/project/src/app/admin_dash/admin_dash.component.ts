import { Component, OnInit } from '@angular/core';
import { Request } from '../model/request';
import { Account } from '../model/account';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RequestService } from '../service/request.service';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin_dash.component.html',
  styleUrls: ['./admin_dash.component.css']
})
export class AdminDashboardComponent implements OnInit{
  requests: Request[] = [];
  isDataLoaded: boolean = false;
  account: Account;
  user: Employee;

  constructor(private requestService: RequestService, private router: Router, private dataService: DataService) {}


ngOnInit(): void {
  this.user = this.dataService.getDataPersistent('model');
  this.account = this.dataService.getDataPersistent('account');
  this.requestService.getRequests().subscribe((data: Request[]) => {
      this.requests = data;
      this.isDataLoaded = true;
    });
    //this.accountCheck();
}

onSignOut() {
  this.dataService.removeDataPersistent('model');
  this.dataService.removeDataPersistent('account');
  this.router.navigate(['/index']);

}

viewRequest(requestID: number){
  this.router.navigate(['/view-request/',requestID]);
}

sortRequestsAlphabetically() {
  this.requests.sort((a, b) => {
    // Use the localeCompare method to compare reuqest names in a case-insensitive manner
    return null
    //return a.priority.name.localeCompare(b.priority.name, undefined, { sensitivity: 'base' });
  });
}  


accountCheck(){
  if (this.account == null || this.user == null || this.account.role.roleName === "STUDENT" || this.account.role.roleName === "PROFESSOR"){ 
    this.router.navigate(['index']);
  }
}

}