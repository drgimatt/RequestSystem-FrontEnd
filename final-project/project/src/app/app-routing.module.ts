import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessorDashboardComponent } from './professor-dashboard/professor-dashboard.component';
import { AdminDashboardComponent } from './admin_dash/admin_dash.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { AddAdvisingtypeComponent } from './add-advisingtype/add-advisingtype.component';
import { ContactComponent } from './contact/contact.component';
import { ViewDogInfoComponent } from './view-dog-info/view-dog-info.component';
import { AddDogComponent } from './add-dog/add-dog.component';
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
    path: 'add-advisingtype', 
    component: AddAdvisingtypeComponent
  },
  { 
    path: 'add-status', 
    component: AddStatusComponent
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
  { path: 'create-account', 
    component: SignupComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
