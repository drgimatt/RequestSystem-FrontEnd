import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../model/student';
import { DataService } from '../data.service';
import { Account } from '../model/account';
import { AdvisingtypeService } from '../service/advisingtype.service';
import { Router } from '@angular/router';
import { RequestService } from '../service/request.service';
import { SubjectsService } from '../service/subjects.service';
import { FormtypeService } from '../service/formtype.service';
import { PriorityService } from '../service/priority.service';
import { StatusService } from '../service/status.service';
import { AdvisingType } from '../model/advisingtype';
import { Subjects } from '../model/subjects';
import { Formtype } from '../model/formtype';
import { Priority } from '../model/priority';
import { Status } from '../model/status';

@Component({
  selector: 'app-modify-student-form',
  templateUrl: './modify-student-form.component.html',
  styleUrls: ['./modify-student-form.component.css']
})
export class ModifyStudentFormComponent {
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

  user: Student;
  account: Account;
  advisingTypeArray: AdvisingType[];
  subjectsArray: Subjects[];
  formTypeArray: Formtype[];
  priorityArray: Priority[];
  statusArray: Status[];
  isDataLoaded: boolean = false;
  showOtherTextBoxFormType: boolean = false;
  showOtherTextBoxAdvisingType: boolean = false;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router, 
              private requestService: RequestService, private advisingTypeService: AdvisingtypeService,
              private subjectsService: SubjectsService, private formTypeService: FormtypeService,
              private priorityService: PriorityService, private statusService: StatusService) {}

  ngOnInit() {
    this.advisingTypeService.getTypes().subscribe((data: AdvisingType[]) => {
      this.advisingTypeArray = data;
    },
    (error) => {
      this.isDataLoaded = false;
    }
  );
    this.formTypeService.getFormTypes().subscribe((data: Formtype[]) => {
      this.formTypeArray = data;
    },
    (error) => {
      this.isDataLoaded = false;
    }
  );
    this.priorityService.getPriorities().subscribe((data: Priority[]) => {
      this.priorityArray = data;
    },
    (error) => {
      this.isDataLoaded = false;
    }
  );
    this.statusService.getStatuses().subscribe((data: Status[]) => {
      this.statusArray = data;
    },
    (error) => {
      this.isDataLoaded = false;
    }
  );      
    this.user = this.dataService.getDataPersistent('model');
    this.account = this.dataService.getDataPersistent('account');
    this.initializeForm();
  }

  initializeForm() {
    // this.studentForm = this.fb.group({
    //   studentNumber: ['', Validators.required],
    //   studentName: ['', Validators.required],
    //   programYear: ['', Validators.required],
    //   emailAddress: ['', [Validators.required, Validators.email]],
    //   phoneNumber: ['', Validators.required],
    //   concern: ['', Validators.required],
    //   formType: ['', Validators.required],
    //   otherOffice: [''],
    //   otherDetails: [''] 
    // });
    this.studentForm = this.fb.group({
      student: '',
      title: '',
      employees: '',
      dateCreated: this.getCurrentDate(),
      dateModified: this.getCurrentDate(),
      dateResolved: '',
      advisingType: '',
      subject: '',
      description: '',
      actionTaken: '',
      phoneNumber: this.account.phoneNumber.toString(),
      formType: '',
      priority: '',
      status: '',
    });
  }

  onFormTypeChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'Others') {
      this.showOtherTextBoxFormType = true;
      this.studentForm.get('otherFormType')?.setValidators(Validators.required);
    } else {
      this.showOtherTextBoxFormType = false;
      this.studentForm.get('otherFormType')?.clearValidators();
      this.studentForm.get('otherFormType')?.setValue('');
    }
    this.studentForm.get('otherFormType')?.updateValueAndValidity();
  }

  onAdvisingTypeChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === 'Others') {
      this.showOtherTextBoxAdvisingType = true;
      this.studentForm.get('otherAdvisingType')?.setValidators(Validators.required);
    } else {
      this.showOtherTextBoxAdvisingType = false;
      this.studentForm.get('otherAdvisingType')?.clearValidators();
      this.studentForm.get('otherAdvisingType')?.setValue('');
    }
    this.studentForm.get('otherAdvisingType')?.updateValueAndValidity();
  }
  
  getCurrentDate(): string {
    const currentDate = new Date();
    // Format the date as "YYYY-MM-DD HH:mm:ss"
    const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');
    return formattedDate;
  }

  onSubmit() {
    const request = new FormData();
    request.append('student',this.user.myId.toString());
    //request.append('employees', null);
    request.append('title', this.studentForm.value.title);
    request.append('dateCreated',this.getCurrentDate());
    request.append('dateModified',this.getCurrentDate());
    //request.append('dateResolved',null);
    request.append('advisingType',this.studentForm.value.advisingType.toString());
    request.append('subject', this.studentForm.value.subject.toString());
    request.append('description',this.studentForm.value.description);
    request.append('actionTaken',this.studentForm.value.actiontaken);
    request.append('phoneNumber',this.account.phoneNumber.toString());
    request.append('formType',this.studentForm.value.formType.toString());
    //request.append('priority',"");
    request.append('status',"2");
    this.requestService.createRequest(request)
    .subscribe(
      (response) => {
        console.log('Request added:', response);
        console.log(request);
        alert('This is working!');
      },
      (error) => {
        console.log(request);
        console.error('Error adding request:', error);
      }
    ); 
    //this.router.navigate(['/student-dashboard']);
  }
}
