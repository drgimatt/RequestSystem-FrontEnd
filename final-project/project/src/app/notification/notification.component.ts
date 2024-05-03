import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  constructor(private router: Router, private dataService: DataService) { }

  navigateToAdminStudentForm() {
    this.router.navigate(['/admin-student-form']);
  }

  return() {
    this.router.navigate(['/dashboard']);
  
  }

  onSignOut() {
    this.dataService.removeDataPersistent('model');
    this.dataService.removeDataPersistent('account');
    this.router.navigate(['/index']);
  
  }
}
