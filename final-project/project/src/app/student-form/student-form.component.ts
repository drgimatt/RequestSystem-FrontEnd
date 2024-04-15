import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup
  concerns = [
    'Thesis/Design Subject concerns',
    'Requirements in Courses Enrolled',
    'Mentoring/Clarification on the Topic of the Subjects Enrolled',
    'Concerns about Electives/Tracks in the Curriculum',
    'Concerns on Internship/OJT Matters',
    'Concerns regarding Placement/Employment Opportunities',
    'Concerns regarding Personal/Family, etc.'
  ];


  constructor(private fb: FormBuilder) {    
    this.studentForm = this.fb.group({
      studentNumber: ['', Validators.required],
      studentName: ['', Validators.required],
      programYear: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      concern: ['', Validators.required],
      formType: ['', Validators.required],
      otherOffice: ['']
    });}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.studentForm = this.fb.group({
      studentNumber: ['', Validators.required],
      studentName: ['', Validators.required],
      programYear: ['', Validators.required],
      emailAddress: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      concern: ['', Validators.required],
      formType: ['', Validators.required],
      otherOffice: ['']
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log("Form submitted!", this.studentForm.value);
      // Handle form submission logic here
    } else {
      console.log("Form is invalid!");
      // Handle invalid form
    }
  }
}
