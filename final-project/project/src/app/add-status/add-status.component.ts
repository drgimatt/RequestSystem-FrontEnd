import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { StatusService } from '../service/status.service';

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css']
})
export class AddStatusComponent {
  newStatus: FormGroup

  constructor(private statusService: StatusService, private fb: FormBuilder, private router: Router) {
    this.newStatus = this.fb.group({
      name: ''
    });

  }



  navigateToHome() {
    this.router.navigate(['index']);

  }

  checkFields(): boolean {
    for (const controlName in this.newStatus.controls) {
      if (this.newStatus.get(controlName).hasError('required')) {
        alert('Please fill out all the required fields.');
        return false;
      }
    }
    this.onUpload();
    return true;

  }



  onUpload() {
    const statusData = new FormData();
    statusData.append('name', this.newStatus.value.name);

    this.statusService.createStatus(statusData)
    .subscribe(
      (response) => {
        console.log('Department added:', response);
        console.log(statusData);
        console.log(this.newStatus.value.name);
        alert('This is working!');
      },
      (error) => {
        console.log(statusData);
        console.log(this.newStatus.value.name);
        console.error('Error adding request:', error);
      }
    );
  }


}

