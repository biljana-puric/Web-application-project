import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { AgencyComponent } from './agency/agency.component';
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
import { AddNewEmployeeComponent } from './add-new-employee/add-new-employee.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "admin", component: AdminLoginComponent},
  {path: "client", component: ClientComponent},
  {path: "agency", component: AgencyComponent},
  {path: "administrator", component: AdminComponent},
  {path: "register", component: RegisterComponent},
  {path: "changePassword", component:ChangePasswordComponent},
  {path: "agencyWeb", component: AgencyWebComponent},
  {path: "profile", component: ProfileComponent},
  {path: "objects", component: ObjectsComponent},
  {path: "agenciesMenu", component: AgenciesMenuComponent},
  {path: "jobs", component: JobsComponent},
  {path: "updateProfile", component: UpdateProfileComponent},
  {path: "requestingJob", component: RequestingJobComponent},
  {path: "employees", component: EmployeesComponent},
  {path: "jobsForAgencies", component:JobsForAgenciesComponent},
  {path: "addNewEmployee", component: AddNewEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
