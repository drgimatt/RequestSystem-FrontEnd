import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectsService } from '../service/subjects.service';

@Component({
  selector: 'app-add-subjects',
  templateUrl: './add-subjects.component.html',
  styleUrls: ['./add-subjects.component.css']
})
export class AddSubjectsComponent {
  newSubject: FormGroup

  constructor(private subjectService: SubjectsService, private fb: FormBuilder, private router: Router) {
    this.newSubject = this.fb.group({
      courseCode: '',
      courseName: '',
      department: 0
    });

  }



  navigateToHome() {
    this.router.navigate(['index']);

  }

  checkFields(): boolean {
    for (const controlName in this.newSubject.controls) {
      if (this.newSubject.get(controlName).hasError('required')) {
        alert('Please fill out all the required fields.');
        return false;
      }
    }
    this.onUpload();
    return true;

  }



  onUpload() {
    const subjectData = new FormData();
    subjectData.append('courseCode', this.newSubject.value.courseCode);
    subjectData.append('name', this.newSubject.value.courseName);
    subjectData.append('department', this.newSubject.value.department.toString());
    this.subjectService.createSubject(subjectData)
    .subscribe(
      (response) => {
        console.log('Subject added:', response);
        console.log(this.newSubject.value.courseCode);
        console.log(this.newSubject.value.courseName);
        console.log(this.newSubject.value.department);
        alert('This is working!');
      },
      (error) => {
        console.log(subjectData);
        console.log(this.newSubject.value.courseCode);
        console.log(this.newSubject.value.courseName);
        console.log(this.newSubject.value.department);
        console.error('Error adding request:', error);
      }
    );
  }
}
