import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MyInfoComponent } from './employees/my-info/my-info.component';
import { ViewEmployeesComponent } from './employees/view-employees/view-employees.component';
import { MyRequestsComponent } from './requests/my-requests/my-requests.component';
import { ViewRequestsComponent } from './requests/view-requests/view-requests.component';
import { AuthenticationGuard } from './users/authentication.guard';
import { LoginComponent } from './users/login/login.component';
import { LogoutComponent } from './users/logout/logout.component';

// specify the route paths of the components here
const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "view-requests", component: ViewRequestsComponent, canActivate:[AuthenticationGuard]},
  { path: "view-employees", component: ViewEmployeesComponent, canActivate:[AuthenticationGuard]},
  { path: "edit-request", component: ViewRequestsComponent, canActivate:[AuthenticationGuard]},
  { path: "my-requests", component: MyRequestsComponent, canActivate:[AuthenticationGuard]},
  { path: "my-info", component: MyInfoComponent, canActivate:[AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
