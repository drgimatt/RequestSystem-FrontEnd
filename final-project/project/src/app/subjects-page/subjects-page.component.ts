import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Subjects } from '../model/subjects';
import { SubjectsService } from '../service/subjects.service';
import { Account } from '../model/account';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-subjects-page',
  templateUrl: './subjects-page.component.html',
  styleUrl: './subjects-page.component.css'
})
export class SubjectsPageComponent implements OnInit {
  subjects: Subjects[] = [];
  filteredSubjects: Subjects[] = [];
  isDataLoaded: boolean = false;
  account: Account;
  user: Employee;

  constructor(private subjectsService: SubjectsService, private router: Router, private dataService: DataService) { 

  }
  ngOnInit(): void {
    this.user = this.dataService.getDataPersistent('model');
    this.account = this.dataService.getDataPersistent('account');
    //this.accountCheck();
    this.subjectsService.getSubjects().subscribe((data: Subjects[]) => {
      this.subjects = data
    this.filteredSubjects = this.subjects
    this.isDataLoaded = true;});
  }
  editEntry(entryID: number){
    //this.router.navigate(['/edit-subject',entryID]);
  }

  deleteEntry(entryID: number){
    if(confirm("Do you want to delete this entry?")){
      this.subjectsService.deleteSubject(entryID).subscribe(response => {
          // Delete operation was successful
          alert('Delete operation successful');
          this.router.navigate(['/management']);
      },
      error => {
        console.error('Delete operation failed:', error);
      })
    } else {
    }
  }

  applySearch(event: any){
    const searchValue = event.target.value;
    if (searchValue == "") {
      this.filteredSubjects = this.subjects;
    }

    else {
      // Filter the requests based on search input value
      this.filteredSubjects = this.subjects.filter(subject => {
          // Ensure that all required properties are not null before accessing their properties
          return (subject && subject.courseCode.toLowerCase().includes(searchValue)) ||
                 (subject && subject.name.toLowerCase().includes(searchValue)) ||
                 (subject && subject.department.name.toLowerCase().includes(searchValue)) ||
                 (subject && subject.employees.some(employee => 
                  employee.firstName.toLowerCase().includes(searchValue) ||
                  employee.lastName.toLowerCase().includes(searchValue)))
                });
  }
  }

  navigateToAdminStudentForm() {
    this.router.navigate(['/admin-student-form']);
  }


  // accountCheck(){
  //   if (this.account == null || this.user == null || this.account.role.roleName !== "ADMINISTRATOR" || this.account.role.roleName !== "STUDENT" || this.account.role.roleName !== "PROFESSOR"){ 
  //     this.dataService.removeDataPersistent('model');
  //     this.dataService.removeDataPersistent('account');
  //     this.router.navigate(['index']);
  //   }
  // }
}
