import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-concerns-page',
  templateUrl: './concerns-page.component.html',
  styleUrl: './concerns-page.component.css'
})
export class ConcernsPageComponent {
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
