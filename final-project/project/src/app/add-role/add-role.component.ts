import { Component } from '@angular/core';
import { UserrolesService } from '../service/userroles.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {
  newRole: FormGroup

  constructor(private roleService: UserrolesService, private fb: FormBuilder, private router: Router) {
    this.newRole = this.fb.group({
      name: ''
    });

  }



  navigateToHome() {
    this.router.navigate(['index']);

  }

  checkFields(): boolean {
    for (const controlName in this.newRole.controls) {
      if (this.newRole.get(controlName).hasError('required')) {
        alert('Please fill out all the required fields.');
        return false;
      }
    }
    this.onUpload();
    return true;

  }



  onUpload() {
    const roleData = new FormData();
    roleData.append('roleName', this.newRole.value.name);
    this.roleService.createRole(roleData)
    .subscribe(
      (response) => {
        console.log('Role added:', response);
        console.log(this.newRole.value.name);

        alert('This is working!');
      },
      (error) => {
        console.log(this.newRole.value.name);
        console.error('Error adding Role:', error);
      }
    );
  }
}
