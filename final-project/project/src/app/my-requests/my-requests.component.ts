import { Component, OnInit } from '@angular/core';
import { RequestService } from '../service/request.service';
import { Request } from '../model/request';
import { Router } from '@angular/router';
import { Account } from '../model/account';
import { Dog } from '../model/dog';
import { DataService } from '../data.service';
import { DogService } from '../service/dogservice';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {
  requests: Request[] = [];
  account: Account = new Account();
  userId: number;
  reqDogNames: string[] = [];

  constructor(
    private requestService: RequestService,
    private router: Router,
    private dataService: DataService,
    private dogService: DogService
  ) {}

  ngOnInit(): void {
    // this.account = this.dataService.getDataPersistent('account');
    // this.userId = this.account.myId;

    // this.requestService.getRequests().subscribe((data: Request[]) => {
    //   // Filter requests to show only those made by the current user
    //   this.requests = data.filter((request) => request.userId === this.userId);

    //   // Iterate through requests and fetch dog names
    //   this.requests.forEach((request) => {
    //     this.dogService.getDog(request.dogId).subscribe((dog: Dog) => {
    //       // Assign the dog's name to the request object
    //       this.reqDogNames.push(dog.name);
    //     });
    //   });
    // });
  }
}
