import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Account } from '../model/account';
import { Employee } from '../model/employee';
import { Request } from '../model/request';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-professor-dashboard',
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.css']
})
export class ProfessorDashboardComponent {

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
  if (this.account == null || this.user == null || this.account.role.roleName === "STUDENT" || this.account.role.roleName === "ADMINISTRATION"){ 
    this.router.navigate(['index']);
  }
}

}
