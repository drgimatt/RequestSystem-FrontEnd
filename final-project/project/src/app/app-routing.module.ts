import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ProfessorDashboardComponent } from './professor-dashboard/professor-dashboard.component';
import { ProfessorDashboardCompletedComponent } from './professor-dashboard-completed/professor-dashboard-completed.component';
import { ProfessorDashboardRejectedComponent } from './professor-dashboard-rejected/professor-dashboard-rejected.component';
import { ProfessorDashboardUnresolvedComponent } from './professor-dashboard-unresolved/professor-dashboard-unresolved.component';
import { AdminDashboardComponent } from './admin_dash/admin_dash.component';
import { AdminDashboardCompletedComponent } from './admin_dash_completed/admin_dash_completed.component';
import { AdminDashboardRejectedComponent } from './admin_dash_rejected/admin_dash_rejected.component';
import { AdminDashboardUnresolvedComponent } from './admin_dash_unresolved/admin_dash_unresolved.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent } from './index/index.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { LoginComponent } from './login/login.component';
import { AddSubjectsComponent } from './add-subjects/add-subjects.component';
import { AddAdvisingtypeComponent } from './add-advisingtype/add-advisingtype.component';
import { ContactComponent } from './contact/contact.component';
import { ViewDogInfoComponent } from './view-dog-info/view-dog-info.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { AddDogComponent } from './add-dog/add-dog.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { AdminStudentFormComponent } from './admin-student-form/admin-student-form.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { AddStatusComponent } from './add-status/add-status.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SignupComponent } from './signup/signup.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserViewDogInfoComponent } from './user-view-dog-info/user-view-dog-info.component';
import { AllRequestsNotifComponent } from './all-requests-notif/all-requests-notif.component';
import { ShowRequestComponent } from './show-request/show-request.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { ShowMyRequestComponent } from './show-my-request/show-my-request.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { ManagementComponent } from './management/management.component';
import { ModifyStudentFormComponent } from './modify-student-form/modify-student-form.component';
import { NotificationComponent } from './notification/notification.component';
import { ContactCodersComponent } from './contact-coders/contact-coders.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { ConcernsPageComponent } from './concerns-page/concerns-page.component';
import { SubjectsPageComponent } from './subjects-page/subjects-page.component';

/* const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full' }, 
  {path: 'index', component: IndexComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'user-dashboard', component: UserDashboardComponent },
  {path: 'login', component: LoginComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'add-dog', component: AddDogComponent},
  {path: 'view-dog-info/:id', component: ViewDogInfoComponent},
  {path: 'user-view-dog-info/:id', component: UserViewDogInfoComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'request-form', component: RequestFormComponent},
  {path: 'create-account', component: SignupComponent}
];
 */

const routes: Routes = [
  { path: '', 
    redirectTo: 'index', 
    pathMatch: 'full' },
  { 
    path: 'index', 
    component: IndexComponent 
  },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent
  }, 
  { 
    path: 'admin-dashboard-completed', 
    component: AdminDashboardCompletedComponent
  }, 
  { 
    path: 'admin-dashboard-rejected', 
    component: AdminDashboardRejectedComponent
  }, 
  { 
    path: 'admin-dashboard-unresolved', 
    component: AdminDashboardUnresolvedComponent
  }, 
  { 
    path: 'add-advisingtype', 
    component: AddAdvisingtypeComponent
  },
  { 
    path: 'admin-student-form', 
    component: AdminStudentFormComponent
  },
  { 
    path: 'add-status', 
    component: AddStatusComponent
  },  
  { 
    path: 'add-advisingtype', 
    component: AddAdvisingtypeComponent
  },
  { 
    path: 'add-role', 
    component: AddRoleComponent
  },  
  { 
    path: 'add-subject', 
    component: AddSubjectsComponent
  },
  { 
    path: 'add-student', 
    component: AddStudentComponent
  },    
  { 
    path: 'student-form', 
    component: StudentFormComponent
  },    
  { 
    path: 'add-employee', 
    component: AddEmployeeComponent
  },       
  { 
    path: 'dashboard', 
    component: DashboardComponent 
  },
  { 
    path: 'user-dashboard', 
    component: UserDashboardComponent 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'contact', 
    component: ContactComponent 
  },
  { 
    path: 'add-dog', 
    component: AddDogComponent 
  },
  { 
    path: 'add-department', 
    component: AddDepartmentComponent
  },
  { 
    path: 'view-dog-info/:id', 
    component: ViewDogInfoComponent 
  },
  { 
    path: 'user-view-dog-info/:id', 
    component: UserViewDogInfoComponent 
  },
  { 
    path: 'view-request/:id', 
    component: StudentFormComponent 
  },
  { 
    path: 'aboutus', 
    component: AboutusComponent 
  },
  { 
    path: 'request-form', 
    component: RequestFormComponent 
  },
  { 
    path: 'requests', 
    component: AllRequestsNotifComponent 
  },
  { 
    path: 'show-request/:id', 
    component: ShowRequestComponent 
  },
  { 
    path: 'modify-request/:id', 
    component: ModifyStudentFormComponent
  },  
  { 
    path: 'my-requests', 
    component: MyRequestsComponent 
  },
  { 
    path: 'my-show-request/:id', 
    component: ShowMyRequestComponent 
  },
  { 
    path: 'professor-dashboard', 
    component: ProfessorDashboardComponent 
  },
  {
    path: 'professor-dashboard-completed',
    component: ProfessorDashboardCompletedComponent
  },
  {
    path: 'professor-dashboard-rejected',
    component: ProfessorDashboardRejectedComponent
  },
  {
    path: 'professor-dashboard-unresolved',
    component: ProfessorDashboardUnresolvedComponent
  },
  { 
    path: 'student-dashboard', 
    component: StudentDashboardComponent 
  },
  { path: 'signup', 
    component: SignupComponent },
  {
    path: 'management',
    component: ManagementComponent},
  {
    path: 'notification',
    component: NotificationComponent},
  {
    path: 'modify-student-form',
    component: ModifyStudentFormComponent},
  {
    path: 'contact-coders',
    component: ContactCodersComponent},
    {
    path: 'employee-page',
    component: EmployeePageComponent},
    {
      path: 'concerns-page',
      component: ConcernsPageComponent},
    {
      path: 'subjects-page',
      component: SubjectsPageComponent}  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
