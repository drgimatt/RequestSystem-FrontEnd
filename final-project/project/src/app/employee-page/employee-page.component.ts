import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Employee } from '../model/employee';
import { Account } from '../model/account';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';


@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.css'
})
export class EmployeePageComponent implements OnInit{
  filterTable: FormGroup;
  searchTable: FormGroup;
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  isDataLoaded: boolean = false;
  account: Account;
  user: Employee;

  constructor(private employeeService: EmployeeService, private router: Router, private dataService: DataService, private fb: FormBuilder) { 
  this.filterTable = this.fb.group({
    tableView : ''
  });
  this.searchTable = this.fb.group({
    searchView : ''
  });    
}
ngOnInit(): void {
  this.user = this.dataService.getDataPersistent('model');
  this.account = this.dataService.getDataPersistent('account');
  //this.accountCheck();
  this.employeeService.getEmployees().subscribe((data: Employee[]) => {
    this.employees = data
  this.filteredEmployees = this.employees
  this.isDataLoaded = true;});

}

editEntry(entryID: number){
  //this.router.navigate(['/edit-employee',entryID]);
}

deleteEntry(entryID: number){
  if(confirm("Do you want to delete this entry?")){
    this.employeeService.deleteEmployee(entryID).subscribe(response => {
        // Delete operation was successful
        alert('Delete operation successful');
        this.router.navigate(['/employee-page']);
    },
    error => {
      console.error('Delete operation failed:', error);
    })
  } else {
  }
}

applySearch(){
  const inputField = document.getElementById('searchInput') as HTMLInputElement;
  const searchValue = inputField.value;
  if (searchValue == "") {
    this.filteredEmployees = this.employees;
  } 
//   else {
//     // Filter the requests based on search input value
//     this.filteredStudents = this.students.filter(student => {
//         // Ensure that all required properties are not null before accessing their properties
//         return (student && student.firstName.toLowerCase().includes(searchValue)) ||
//                (student && student.lastName.toLowerCase().includes(searchValue)) ||
//                (student && student.studentID.toString().includes(searchValue)) ||
//                (student && student.department.name.toLowerCase().includes(searchValue)) ||
//                (student && student.program.toLowerCase().includes(searchValue)) ||
//                (student && student.yearLevel.toString().includes(searchValue)) ||
//                (student && student.email.toLowerCase().includes(searchValue)) ||
//                (student && student.gender.toLowerCase().includes(searchValue));
//     });
// }
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
