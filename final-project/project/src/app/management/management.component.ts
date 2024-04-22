import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {
  constructor(private router: Router, private dataService: DataService) { }

  navigateToAdminStudentForm() {
    this.router.navigate(['/admin-student-form']);
  }

  onSignOut() {
    this.dataService.removeDataPersistent('model');
    this.dataService.removeDataPersistent('account');
    this.router.navigate(['/index']);
  
  }
}
