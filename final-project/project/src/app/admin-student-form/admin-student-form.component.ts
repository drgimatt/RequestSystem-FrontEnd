import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-student-form',
  templateUrl: './admin-student-form.component.html',
  styleUrls: ['./admin-student-form.component.css']
})
export class AdminStudentFormComponent {
  options: string[] = ['Thesis/Design Subject concerns', 'Requirements in Courses Enrolled'];
  newOption: string = '';

  constructor() { }

  addOption() {
    if (this.newOption.trim() !== '') {
      this.options.push(this.newOption);
      this.newOption = ''; // Clear the input after adding
    }
  }

  editOption(option: string) {
    // Implement edit logic here
    console.log('Editing option:', option);
  }

  deleteOption(option: string) {
    const index = this.options.indexOf(option);
    if (index !== -1) {
      this.options.splice(index, 1); 
    }
  }
}
