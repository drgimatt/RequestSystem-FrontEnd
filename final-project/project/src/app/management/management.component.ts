import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {
  constructor(private router: Router) { }

  navigateToAdminStudentForm() {
    this.router.navigate(['/admin-student-form']);
  }
}
