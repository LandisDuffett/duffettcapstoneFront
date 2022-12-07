import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './users/login/login.component';
import { LogoutComponent } from './users/logout/logout.component';
import { ViewRequestsComponent } from './requests/view-requests/view-requests.component';
import { ViewEmployeesComponent } from './employees/view-employees/view-employees.component';
import { MyInfoComponent } from './employees/my-info/my-info.component';
import { MyRequestsComponent } from './requests/my-requests/my-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    ViewRequestsComponent,
    ViewEmployeesComponent,
    MyInfoComponent,
    MyRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
