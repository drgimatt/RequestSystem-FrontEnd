import { Component } from '@angular/core';
import { AdvisingtypeService } from '../service/advisingtype.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-advisingtype',
  templateUrl: './add-advisingtype.component.html',
  styleUrls: ['./add-advisingtype.component.css']
})
export class AddAdvisingtypeComponent {
  newAdvisingtype: FormGroup

  constructor(private advisingService: AdvisingtypeService, private fb: FormBuilder, private router: Router) {
    this.newAdvisingtype = this.fb.group({
      advisingtypeName: ''
    });

  }



  navigateToHome() {
    this.router.navigate(['index']);
  }

  checkFields(): boolean {
    for (const controlName in this.newAdvisingtype.controls) {
      if (this.newAdvisingtype.get(controlName).hasError('required')) {
        alert('Please fill out all the required fields.');
        return false;
      }
    }
    this.onUpload();
    return true;

  }



  onUpload() {
    const advisingTypeData = new FormData();
    advisingTypeData.append('name', this.newAdvisingtype.value.advisingtypeName);
    this.advisingService.createType(advisingTypeData)
    .subscribe(
      (response) => {
        console.log('Advising type added:', response);
        console.log(this.newAdvisingtype.value.advisingtypeName);

        alert('This is working!');
      },
      (error) => {
        console.log(advisingTypeData);
        console.log(this.newAdvisingtype.value.advisingtypeName);
        console.error('Error adding advising type:', error);
      }
    );
  }
}
