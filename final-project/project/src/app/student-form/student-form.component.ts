import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../model/student';
import { DataService } from '../data.service';
import { Account } from '../model/account';
import { AdvisingtypeService } from '../service/advisingtype.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
import { Request } from '../model/request';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
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
  request: Request;
  forSubmitting: boolean = true;
  isDataLoaded: boolean = false;
  showOtherTextBoxFormType: boolean = false;
  showOtherTextBoxAdvisingType: boolean = false;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router, 
              private requestService: RequestService, private advisingTypeService: AdvisingtypeService,
              private subjectsService: SubjectsService, private formTypeService: FormtypeService,
              private priorityService: PriorityService, private statusService: StatusService, private route: ActivatedRoute) {
                this.studentForm = this.fb.group({
                  student: '',
                  title: '',
                  employees: '',
                  dateCreated: this.getCurrentDate(),
                  dateModified: this.getCurrentDate(),
                  dateResolved: '',
                  advisingType: '',
                  otherAdvisingType: '',
                  subject: '',
                  description: '',
                  actionTaken: '',
                  phoneNumber: '',
                  formType: '',
                  otherFormType: '',
                  priority: '',
                  status: '',
                });
              }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        this.forSubmitting = false;
        this.studentForm.get('');
        const id = params['id'];
        this.requestService.getRequest(id).subscribe(data => {
          this.request = data; 
          this.initializeForm();
        });
      } else {
        this.forSubmitting = true;
      }
    });  

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
    //this.initializeForm();
  }

  initializeForm() {
    this.studentForm = this.fb.group({
      student: this.request.student,
      title: this.request.title,
      employees: this.request.employees,
      dateCreated: this.request.dateCreated,
      dateModified: this.request.dateModified,
      dateResolved: this.request.dateResolved,
      advisingType: this.request.advisingType.id,
      otherAdvisingType: this.request.otherAdvisingType,
      subject: this.request.subject,
      description: this.request.description,
      actionTaken: this.request.actionTaken,
      phoneNumber: this.request.phoneNumber,
      formType: this.request.formType.id,
      otherFormType: this.request.otherFormType,
      priority: this.request.priority.id,
      status: this.request.status,
      otherGender: this.request.formType.name
    });
    this.studentForm.get('advisingType').disable()
    this.studentForm.get('formType').disable()
  }

  onFormTypeChange(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue === '4') {
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
    if (selectedValue === '8') {
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

  private getDateStamp(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());
    const seconds = this.padZero(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  onSubmit() {
    const request = new FormData();
    request.append('student',this.user.myId.toString());
    //request.append('employees', null);
    request.append('title', this.studentForm.value.title);
    request.append('dateCreated',this.getDateStamp());
    request.append('dateModified',this.getDateStamp());
    //request.append('dateResolved',null);
    request.append('advisingType',this.studentForm.value.advisingType.toString());
    request.append('subject', this.studentForm.value.subject.toString());
    request.append('description',this.studentForm.value.description);
    request.append('actionTaken',this.studentForm.value.actiontaken);
    request.append('otherFormType',this.studentForm.value.otherFormType);
    request.append('otherAdvisingType',this.studentForm.value.otherAdvisingType);
    request.append('phoneNumber',this.account.phoneNumber.toString());
    request.append('formType',this.studentForm.value.formType.toString());
    request.append('priority',"1");
    request.append('status',"2");
    this.requestService.createRequest(request)
    .subscribe(
      (response) => {
        console.log('Request added:', response);
        console.log(request);
        alert('Request has been submitted successfully!');
        this.router.navigate(['/student-dashboard']);
      },
      (error) => {
        console.log(request);
        alert('Request submission has failed. Please try again.');
        console.error('Error adding request:', error);
      }
    ); 
    
  }
}
