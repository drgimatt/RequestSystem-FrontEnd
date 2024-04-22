import { Component, OnInit } from '@angular/core';
import { Request } from '../model/request';
import { Account } from '../model/account';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RequestService } from '../service/request.service';
import { Student } from '../model/student';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit{
  requests: Request[] = [];
  isDataLoaded: boolean = false;
  account: Account;
  studentArray: Student[];
  user: Student;

  constructor(private requestService: RequestService, private router: Router, private dataService: DataService) {}


  ngOnInit(): void {
    this.user = this.dataService.getDataPersistent('model');
    this.requestService.getRequests().subscribe((data: Request[]) => {
        this.requests = data;
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
