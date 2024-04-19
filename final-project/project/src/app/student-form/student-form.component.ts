import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Request {
  requestId: number;
  student: {
    studentNumber: string;
    studentName: string;
    programYear: string;
    emailAddress: string;
    phoneNumber: string;
  };
  title: string;
  dateCreated: Date;
  dateModified: Date;
  dateResolved: Date;
  advisingType: string; 
  subject: string; 
  description: string;
  actionTaken: string;
  priority: string; 
  status: string; 
}

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  concerns = [
    'Thesis/Design Subject concerns',
    'Requirements in Courses Enrolled',
    'Mentoring/Clarification on the Topic of the Subjects Enrolled',
    'Concerns about Electives/Tracks in the Curriculum',
    'Concerns on Internship/OJT Matters',
    'Concerns regarding Placement/Employment Opportunities',
    'Concerns regarding Personal/Family, etc.'
  ];

  constructor(private fb: FormBuilder) {}

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
      otherOffice: [''],
      otherDetails: [''] 
    });
  }
  
  

  onSubmit() {
    if (this.studentForm.valid) {
      const request: Request = {
        requestId: 0, 
        student: {
          studentNumber: this.studentForm.value.studentNumber,
          studentName: this.studentForm.value.studentName,
          programYear: this.studentForm.value.programYear,
          emailAddress: this.studentForm.value.emailAddress,
          phoneNumber: this.studentForm.value.phoneNumber,
        },
        title: '', 
        dateCreated: new Date(),
        dateModified: new Date(),
        dateResolved: new Date(),
        advisingType: this.studentForm.value.formType, // Assuming formType corresponds to advisingType
        subject: '', 
        description: this.studentForm.value.otherOffice || '',
        actionTaken: '',
        priority: '', 
        status: '' 
      };
      console.log("Form submitted!", request);
    } else {
      console.log("Form is invalid!");
      // Handle invalid form
    }
  }
}
