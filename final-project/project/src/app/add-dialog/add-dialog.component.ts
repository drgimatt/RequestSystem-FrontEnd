import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { StudentService } from '../service/student.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DepartmentService } from '../service/department.service';
import { Department } from '../model/department';
import { Student } from '../model/student';
import { DatePipe } from '@angular/common';
import { AddStudentComponent } from '../add-student/add-student.component';
import { AddDialogService } from "../service/add-dialog.service";

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrl: './add-dialog.component.css'
})
export class AddDialogComponent {
  newStudent: FormGroup;
  student : Student;
  selectedFile : File;
  selectedFileName: string; 
  departmentList: Department[] = [];
  isDataLoaded: boolean = false;
  forEditing: boolean = false;
  showOtherTextbox: boolean = false;
  action: string;

constructor(private departmentService: DepartmentService, private studentService: StudentService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private datePipe: DatePipe, private shared: AddDialogService){}
  
  ngOnInit() {
    this.shared.currentAction.subscribe(action => this.action = action);
  }

  confirmAction() {
    this.shared.changeAction("confirm");
  }
  cancelAction() {
    this.shared.changeAction("cancel");
  }
}
