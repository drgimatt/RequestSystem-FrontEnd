import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagementComponent } from './management/management.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StudentFormComponent } from './student-form/student-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AddSubjectsComponent } from './add-subjects/add-subjects.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddStatusComponent } from './add-status/add-status.component';
import { AddAdvisingtypeComponent } from './add-advisingtype/add-advisingtype.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ModifyStudentFormComponent } from './modify-student-form/modify-student-form.component';
import { Router, RouterModule } from '@angular/router';
import { NotificationComponent } from './notification/notification.component';
import { AdminStudentFormComponent } from './admin-student-form/admin-student-form.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { ConcernsPageComponent } from './concerns-page/concerns-page.component';
import { SubjectsPageComponent } from './subjects-page/subjects-page.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { FinalDashComponent } from './final-dash/final-dash.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SignoutDialogComponent } from './signout-dialog/signout-dialog.component';



@NgModule({
  declarations: [
    AppComponent,

    IndexComponent,
    LoginComponent,
    ContactComponent,
    ManagementComponent,
    AboutusComponent,
    SignupComponent,
    StudentFormComponent,
    AddDepartmentComponent,
    AddStudentComponent,
    AddSubjectsComponent,
    AddEmployeeComponent,
    AddStatusComponent,
    AddAdvisingtypeComponent,
    AddRoleComponent,
    NotificationComponent,
    ModifyStudentFormComponent,
    AdminStudentFormComponent,
    EmployeePageComponent,
    ConcernsPageComponent,
    SubjectsPageComponent,
    FinalDashComponent,
    StudentLoginComponent,
    SignoutDialogComponent,
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgbModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  exports:[RouterModule],
  providers: [
    provideAnimationsAsync(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
