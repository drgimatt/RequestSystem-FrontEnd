import { Component, OnInit } from '@angular/core';
import { Request } from '../model/request';
import { Account } from '../model/account';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RequestService } from '../service/request.service';
import { Employee } from '../model/employee';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Student } from '../model/student';

@Component({
  selector: 'app-signout-dialog',
  templateUrl: './signout-dialog.component.html',
  styleUrl: './signout-dialog.component.css'
})
export class SignoutDialogComponent {
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

  constructor(private requestService: RequestService, private router: Router, private dataService: DataService, private fb: FormBuilder) {
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

  onSignOut() {
    this.dataService.removeDataPersistent('model');
    this.dataService.removeDataPersistent('account');
    this.router.navigate(['/index']);
  }
}
