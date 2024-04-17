import { Component, OnInit } from '@angular/core';
import { Request } from '../model/request';
import { Account } from '../model/account';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin_dash.component.html',
  styleUrls: ['./admin_dash.component.css']
})
export class AdminDashboardComponent implements OnInit{
  requests: Request[] = [];
  isDataLoaded: boolean = false;
  account: Account;

  constructor(private requestService: RequestService, private router: Router, private dataService: DataService) {}


ngOnInit(): void {
  this.requestService.getRequests().subscribe((data: Request[]) => {
      this.requests = data;
      this.isDataLoaded = true;
    });

}

sortRequestsAlphabetically() {
  this.requests.sort((a, b) => {
    // Use the localeCompare method to compare reuqest names in a case-insensitive manner
    return null
    //return a.priority.name.localeCompare(b.priority.name, undefined, { sensitivity: 'base' });
  });
}  


accountCheck(){
  this.account = this.dataService.getDataPersistent('account');
  if (this.account == null || this.account.role.roleName === "ADMIN"){ 
    this.router.navigate(['index']);
  }
}


}