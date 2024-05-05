import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AdvisingType } from '../model/advisingtype';
import { AdvisingtypeService } from '../service/advisingtype.service';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogService } from '../service/add-dialog.service';

@Component({
  selector: 'app-admin-student-form',
  templateUrl: './admin-student-form.component.html',
  styleUrls: ['./admin-student-form.component.css']
})
export class AdminStudentFormComponent implements OnInit{
  action: string;
  newConcerns: FormGroup
  forEditing: boolean = false;
  advisingType: AdvisingType;

  constructor(private advisingService: AdvisingtypeService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private shared:AddDialogService) {
    this.newConcerns = this.fb.group({
      name: ''
    });

  }
  ngOnInit(): void {
    this.shared.currentAction.subscribe(action => this.action = action);
    this.route.params.forEach((params: Params) => {  
        if (params['id'] !== undefined) {
          this.forEditing = true;
          this.newConcerns.get('');
          const id = params['id'];
          this.advisingService.getType(id).subscribe(data => {
            this.advisingType = data;
            this.newConcerns = this.fb.group({
              name: this.advisingType.name
            });
          });
        } 
  
    }); 
    
  }

  navigateToHome() {
    this.router.navigate(['index']);
  }

  checkFields(): boolean {
    for (const controlName in this.newConcerns.controls) {
      if (this.newConcerns.get(controlName).hasError('required')) {
        alert('Please fill out all the required fields.');
        return false;
      }
    }
    if (this.forEditing === false) {
      this.onUpload();
    } else {
      this.onEdit();
    }
    return true;

  }

  onEdit(){
    const advisingTypeData = new FormData();
    advisingTypeData.append('id', this.advisingType.id.toString())
    advisingTypeData.append('name', this.newConcerns.value.name);
    this.advisingService.createType(advisingTypeData)
    .subscribe(
      (response) => {
        console.log('Advising type added:', response);
        console.log(this.newConcerns.value.name);
        alert('Advising Type has been updated!');
        this.router.navigate(['/concerns-page']);
      },
      (error) => {
        console.log(advisingTypeData);
        console.log(this.newConcerns.value.name);
        console.error('Error editing advising type:', error);
      }
    );
  }
  

  onUpload() {
    const advisingTypeData = new FormData();
    advisingTypeData.append('name', this.newConcerns.value.name);
    this.advisingService.createType(advisingTypeData)
    .subscribe(
      (response) => {
        console.log('Advising type added:', response);
        console.log(this.newConcerns.value.name);
        alert('Advising Type has been added!');
        this.router.navigate(['/concerns-page']);
      },
      (error) => {
        console.log(advisingTypeData);
        console.log(this.newConcerns.value.name);
        console.error('Error adding advising type:', error);
      }
    );
  }

  // for the dialog box
  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '400px',
      height: '250px'
    });
    dialogRef.afterClosed().subscribe((result)=> {
      if (this.action === 'confirm') {
        // Proceed with form submission
        this.checkFields();
        this.action = "";
      } else {
        console.log("Dialog canceled or closed without confirmation.");
        this.action = "";
      }
    });
  }
}
