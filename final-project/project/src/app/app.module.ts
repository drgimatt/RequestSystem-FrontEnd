import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin_dash/admin_dash.component';
import { ProfessorDashboardComponent } from './professor-dashboard/professor-dashboard.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { ViewDogInfoComponent } from './view-dog-info/view-dog-info.component';
import { AddDogComponent } from './add-dog/add-dog.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from './signup/signup.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserViewDogInfoComponent } from './user-view-dog-info/user-view-dog-info.component';
import { AllRequestsNotifComponent } from './all-requests-notif/all-requests-notif.component';
import { ShowRequestComponent } from './show-request/show-request.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';
import { ShowMyRequestComponent } from './show-my-request/show-my-request.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    DashboardComponent,
    IndexComponent,
    LoginComponent,
    ProfessorDashboardComponent,
    ContactComponent,
    ViewDogInfoComponent,
    AddDogComponent,
    AboutusComponent,
    RequestFormComponent,
    SignupComponent,
    UserDashboardComponent,
    UserViewDogInfoComponent,
    AllRequestsNotifComponent,
    ShowRequestComponent,
    ShowMyRequestComponent,
    MyRequestsComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
