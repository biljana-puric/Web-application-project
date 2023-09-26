import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { AgencyComponent } from './agency/agency.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AgencyWebComponent } from './agency-web/agency-web.component';
import { ProfileComponent } from './profile/profile.component';
import { ObjectsComponent } from './objects/objects.component';
import { AgenciesMenuComponent } from './agencies-menu/agencies-menu.component';
import { JobsComponent } from './jobs/jobs.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { RequestingJobComponent } from './requesting-job/requesting-job.component';
import { EmployeesComponent } from './employees/employees.component';
import { JobsForAgenciesComponent } from './jobs-for-agencies/jobs-for-agencies.component';
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientComponent,
    AgencyComponent,
    AdminComponent,
    AdminLoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    AgencyWebComponent,
    ProfileComponent,
    ObjectsComponent,
    AgenciesMenuComponent,
    JobsComponent,
    UpdateProfileComponent,
    RequestingJobComponent,
    EmployeesComponent,
    JobsForAgenciesComponent,
    AddNewEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
