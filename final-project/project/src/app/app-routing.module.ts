import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { ViewDogInfoComponent } from './view-dog-info/view-dog-info.component';
import { AddDogComponent } from './add-dog/add-dog.component';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full' }, // Redirect to '/index' for the default route
  {path: 'index', component: IndexComponent },
  {path: 'dashboard', component: DashboardComponent },
  {path: 'login', component: LoginComponent },
  {path: 'contact', component: ContactComponent },
  {path: 'add-dog', component: AddDogComponent},
  {path: 'view-dog-info', component: ViewDogInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
