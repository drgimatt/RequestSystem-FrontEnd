import { Component, OnInit } from '@angular/core';
import { Dog } from '../model/dog';
import { DogService } from '../service/dogservice';
import { Router } from '@angular/router';
import { Account } from '../model/account';
import { DataService } from '../data.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})

export class UserDashboardComponent implements OnInit{
  dogs: Dog[] = [];
  isDataLoaded: boolean = false;
  account: Account;
  constructor(private dogService: DogService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.dogService.getDogs().subscribe((data: Dog[]) => {
      this.dogs = data;
      console.log('Setting userId in local storage:', this.account.myId);
      localStorage.setItem('userId', this.account.myId.toString());
      this.sortDogsAlphabetically();
      this.isDataLoaded = true;
    });
    //this.accountCheck();
  }
  

  accountCheck(){
    this.account = this.dataService.getDataPersistent('account');
    if (this.account == null || this.account.role.roleName === "ADMIN"){ 
      this.router.navigate(['index']);
    }
  }

  logout(){
    this.dataService.removeDataPersistent('account');
    this.router.navigate(['index']);
  }

  sortDogsAlphabetically() {
    this.dogs.sort((a, b) => {
      // Use the localeCompare method to compare dog names in a case-insensitive manner
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
    });
  }  
}
