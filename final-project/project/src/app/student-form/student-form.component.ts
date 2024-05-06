import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { Employee } from '../model/employee';
import { DatePipe } from '@angular/common';
import { NotificationService } from '../service/notification.service';
import { Notification } from '../model/notification';
import { EmployeeService } from '../service/employee.service';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup
  student: Student;
  employee: Employee;
  account: Account;
  notification: Notification;
  advisingTypeArray: AdvisingType[];
  subjectsArray: Subjects[];
  formTypeArray: Formtype[];
  priorityArray: Priority[];
  employeeArray: Employee[];
  filteredEmployeeArray: Employee[];
  statusArray: Status[];
  request: Request;
  forSubmitting: boolean = true;
  isDataLoaded: boolean = false;
  hasLoaded: boolean = false;
  showOtherTextBoxFormType: boolean = false;
  showSubjectsBox: boolean = false;
  showOtherTextBoxAdvisingType: boolean = false;
  showOtherAction: boolean = false;

  constructor(private fb: FormBuilder, private dataService: DataService, private router: Router, private datePipe: DatePipe,
              private requestService: RequestService, private advisingTypeService: AdvisingtypeService, private employeeService: EmployeeService,
              private subjectsService: SubjectsService, private formTypeService: FormtypeService, private notificationService: NotificationService,
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
                  subjects: '',
                  description: '',
                  actionTaken: '',
                  phoneNumber: '',
                  formType: '',
                  otherFormType: '',
                  priority: '',
                  status: '',
                  otherActionTaken: ''
                });
              }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (!this.hasLoaded) {
        this.hasLoaded = true; // Set the flag to true to indicate that the code block has been executed
        
        if (params['id'] !== undefined) {
          this.forSubmitting = false;
          this.studentForm.get('');
          const id = params['id'];
          this.requestService.getRequest(id).subscribe(data => {
            this.request = data;
            this.student = this.request.student;
            this.initializeForm();
          });
        } else {
          this.student = this.dataService.getDataPersistent('model');
          this.forSubmitting = true;
        }
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
    this.subjectsService.getSubjects().subscribe((data: Subjects[]) => {
      this.subjectsArray = data;
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
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      this.employeeArray = data;
      this.filteredEmployeeArray = data.filter(employee => !employee.position.toLowerCase().includes('Professor'));
    },
    (error) => {
      this.isDataLoaded = false;
    }
  ); 
    this.account = this.dataService.getDataPersistent('account');
  }

  initializeForm() {
    console.log('this is being called')
    this.student = this.request.student;
    this.studentForm = this.fb.group({
      student: this.request.student,
      title: this.request.title,
      employees: this.request.employees,
      dateCreated: this.request.dateCreated,
      dateModified: this.request.dateModified,
      dateResolved: this.request.dateResolved,
      advisingType: this.request.advisingType.id,
      otherAdvisingType: this.request.otherAdvisingType,
      subjects: this.request.subject?.myId,
      description: this.request.description,
      actionTaken: this.request.actionTaken,
      phoneNumber: this.request.phoneNumber,
      otherActionTaken: '',
      // formType: this.request.formType.id,
      // otherFormType: this.request.otherFormType,
      priority: this.request.priority.id,
      status: this.request.status.id,
      otherGender: this.request.student.gender,
    });

    if(this.studentForm.value.subjects !== null){
      this.showSubjectsBox = true;
    }
    if (this.studentForm.value.otherAdvisingType !== ""){
      this.showOtherTextBoxAdvisingType = true;
    }
    if (this.request.actionTaken !== "Awaiting Information" && this.request.actionTaken !== "Clarification Needed" && this.request.actionTaken !== "Under Review" && this.request.actionTaken !== "Scheduled"){
      this.showOtherAction = true;      
      this.studentForm.get('actionTaken')?.setValue('Others');
      this.studentForm.get('otherActionTaken')?.setValue(this.request.actionTaken);
    }
      this.isDataLoaded = true;
      this.studentForm.get('advisingType').disable()
      this.studentForm.get('otherAdvisingType').disable()
      this.studentForm.get('subjects').disable()
      this.studentForm.get('status').disable()
      this.studentForm.get('actionTaken').disable()
      this.studentForm.get('otherActionTaken').disable()
      this.studentForm.get('priority').disable()

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
      this.showSubjectsBox = false;
      this.studentForm.get('otherAdvisingType')?.setValidators(Validators.required);
    } else if (selectedValue === '2' || selectedValue === '3') {
      this.showSubjectsBox = true;
      this.showOtherTextBoxAdvisingType = false;
      this.studentForm.get('subjects')?.setValidators(Validators.required);
    }
    else {
      this.showOtherTextBoxAdvisingType = false;
      this.showSubjectsBox = false;
      this.studentForm.get('subjects')?.clearValidators();
      this.studentForm.get('subjects')?.setValue('');
      this.studentForm.get('otherAdvisingType')?.clearValidators();
      this.studentForm.get('otherAdvisingType')?.setValue('');
    }
    this.studentForm.get('otherAdvisingType')?.updateValueAndValidity();
    this.studentForm.get('subjects')?.updateValueAndValidity();
  }
  
  getCurrentDate(): string {
    const currentDate = new Date();
    // Format the date as "YYYY-MM-DD HH:mm:ss"
    const formattedDate = this.formatDate(currentDate);
    return formattedDate;
  }

  formatDate(date: Date): string {
    // Use DatePipe to format the date
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss')!;
  }

  onCancel(){
    if (this.account.role.roleName === "STUDENT" || this.account.role.roleName === "ADMINISTRATION"){
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/index']);
    }
  }

//   private getDateStamp(): string {
//     const date = new Date();
//     const year = date.getFullYear();
//     const month = this.padZero(date.getMonth() + 1);
//     const day = this.padZero(date.getDate());
//     const hours = this.padZero(date.getHours());
//     const minutes = this.padZero(date.getMinutes());
//     const seconds = this.padZero(date.getSeconds());
//     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
// }

private getDateStamp() {
  const date = new Date();
  // const year = date.getFullYear();
  // const month = this.padZero(date.getMonth() + 1);
  // const day = this.padZero(date.getDate());
  // const hours = this.padZero(date.getHours());
  // const minutes = this.padZero(date.getMinutes());
  // const seconds = this.padZero(date.getSeconds());
  return this.formatDate(date);
}
  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  onSubmit() {

    const request = new FormData();
    request.append('student',this.student.myId.toString());
    //request.append('employees', this.studentForm.value.subjects.);
    request.append('title', this.studentForm.value.title);
    request.append('dateCreated',this.getDateStamp());
    request.append('dateModified',this.getDateStamp());
    //request.append('dateResolved',null);
    request.append('advisingType',this.studentForm.value.advisingType.toString());
    request.append('subject', this.studentForm.value.subjects.toString());
    request.append('description',this.studentForm.value.description);
    request.append('actionTaken','Under Review');
    request.append('otherFormType',this.studentForm.value.otherFormType);
    request.append('otherAdvisingType',this.studentForm.value.otherAdvisingType);
    request.append('phoneNumber',this.account.phoneNumber.toString());
    //request.append('formType',this.studentForm.value.formType.toString());
    request.append('priority',"1");
    request.append('status',"2");
    request.append('isDeleted',"0");

    this.requestService.createRequest(request)
    .subscribe(
      (response) => {
        console.log('Request added:', response);
        console.log(request);
        //alert('Request has been submitted successfully!');
        //this.onCancel();
      },
      (error) => {
        console.log(request);
        alert('Request submission has failed. Please try again.');
        console.error('Error adding request: ', error);
      }
    ); 

    
    const notification = new FormData();
    notification.append('title', "New Student Request")
    notification.append('message',"A new request has been made by " + this.student.firstName + " " + this.student.lastName)
    notification.append('eventType','newRequest')
    notification.append('hasSeenNotif', '0')
    notification.append('date', this.getDateStamp())
    const employeeIds = this.filteredEmployeeArray.map(employee => employee.myId);
    employeeIds.forEach(id => notification.append('notifyPersons', id.toString()));
    notification.append('eventUser', this.student.myId.toString())
    //notification.append('request', this.request)
    
    this.notificationService.createNotification(notification)
    .subscribe(
      (response) => {
        alert('Request has been submitted successfully!');
        this.onCancel();
      },
      (error) => {
        console.error('Error adding notification: ', error);
      }
    );


  }
}
