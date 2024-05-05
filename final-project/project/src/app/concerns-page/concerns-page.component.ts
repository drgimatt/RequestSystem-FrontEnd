import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { Account } from '../model/account';
import { Employee } from '../model/employee';
import { AdvisingtypeService } from '../service/advisingtype.service';
import { AdvisingType } from '../model/advisingtype';

@Component({
  selector: 'app-concerns-page',
  templateUrl: './concerns-page.component.html',
  styleUrl: './concerns-page.component.css'
})
export class ConcernsPageComponent implements OnInit{
  advisingTypes: AdvisingType[] = [];
  filteredAdvisingTypes: AdvisingType[] = [];
  isDataLoaded: boolean = false;
  account: Account;
  user: Employee;  
  constructor(private advisingTypeService: AdvisingtypeService, private router: Router, private dataService: DataService) { }
  ngOnInit(): void {
    this.user = this.dataService.getDataPersistent('model');
    this.account = this.dataService.getDataPersistent('account');
    //this.accountCheck();
    this.advisingTypeService.getTypes().subscribe((data: AdvisingType[]) => {
      this.advisingTypes = data
    this.filteredAdvisingTypes = this.advisingTypes
    this.isDataLoaded = true;});
  }

  editEntry(entryID: number){
    this.router.navigate(['/edit-concern',entryID]);
  }

  deleteEntry(entryID: number){
    if(confirm("Do you want to delete this entry?")){
      this.advisingTypeService.deleteType(entryID).subscribe(response => {
          // Delete operation was successful
          alert('Delete operation successful');
          this.router.navigate(['/concerns-page']);
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
      this.filteredAdvisingTypes = this.advisingTypes;
    }

    else {
      // Filter the requests based on search input value
      this.filteredAdvisingTypes = this.advisingTypes.filter(types => {
          // Ensure that all required properties are not null before accessing their properties
          return (types && types.id.toString().toLowerCase().includes(searchValue)) ||
                 (types && types.name.toLowerCase().includes(searchValue))

      });
  }
  }

  navigateToAdminStudentForm() {
    this.router.navigate(['/admin-student-form']);
  }


  accountCheck(){
    if (this.account == null || this.user == null || this.account.role.roleName !== "ADMINISTRATOR" ){ 
      this.dataService.removeDataPersistent('model');
      this.dataService.removeDataPersistent('account');
      this.router.navigate(['index']);
    }
  }
}
