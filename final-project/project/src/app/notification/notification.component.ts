import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { NotificationService } from '../service/notification.service';
import { Notification } from '../model/notification';
import { Employee } from '../model/employee';
import { Account } from '../model/account';
import { Student } from '../model/student';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{

  filteredEmployeeArray: Employee[];
  notificationArray: Notification[];
  account: Account
  model: Employee;

  constructor(private router: Router, private dataService: DataService, private notificationService: NotificationService, private datePipe: DatePipe) { 
    this.account = this.dataService.getDataPersistent('account');
    this.model = this.dataService.getDataPersistent('model');
  }
  
  formatDate(date: Date): string {
    // Use DatePipe to format the date
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss')!;
  }
  
  ngOnInit(): void {
    this.notificationService.getUserNotifications(this.account.userID).subscribe(data => {
      this.notificationArray = data;
    });
  }

  navigateToAdminStudentForm() {
    this.router.navigate(['/admin-student-form']);
  }

  onDismiss(id: any){
    const specificNotificationIndex = this.notificationArray.findIndex(notification => notification.id === id);
    const specificNotification = this.notificationArray.find(notification => notification.id === id);
    const notification = new FormData();

    notification.append('title', specificNotification.title)
    notification.append('message',specificNotification.message)
    notification.append('eventType',specificNotification.eventType)
    notification.append('hasSeenNotif', specificNotification.hasSeenNotif.toString())
    notification.append('date', this.formatDate(specificNotification.date))
    notification.append('eventUser', specificNotification.eventUser.myId.toString())

    const filteredEmployees = specificNotification.notifyPersons.filter(person => person instanceof Employee);
    this.filteredEmployeeArray = filteredEmployees as Employee[];
    notification.append('id', id.toString())
    console.log('User id: ', this.model.myId)
    const employeeIds = this.filteredEmployeeArray.filter(employee => employee.myId !== this.model.myId);
    notification.append('notifyPersons', employeeIds.join(','));
    this.notificationService.updateNotification(id, notification)
    .subscribe(
      (response) => {
        // alert('Request has been submitted successfully!');
        this.notificationArray.splice(specificNotificationIndex, 1);
      },
      (error) => {
        // console.error('Error adding notification: ', error);
      }
    );
  }

  return() {
    this.router.navigate(['/dashboard']);
  
  }
  
  userCheck(){

  }


}
