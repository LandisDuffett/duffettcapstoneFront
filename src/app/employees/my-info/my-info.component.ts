import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/users/auth.service';
import { User } from 'src/app/users/user.model';
import Swal from 'sweetalert2';
import { EmployeeService } from '../employee.service';


@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  currentUserInfo = this.authService.retreiveUserInfo();

  shouldDisplay: boolean = false;

  oldPassword: string = "";
  confirmNewPassword: string = "";
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  updateEmployee: any = {
    userId: 0,
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userPassword: '',
    userRole: ''
  }

  updatePwd: any = {
    userId: this.currentUserInfo.userId,
    userFirstName: this.currentUserInfo.userFirstName,
    userLastName: this.currentUserInfo.userLastName,
    userEmail: this.currentUserInfo.userEmail,
    userPassword: '',
    userRole: this.currentUserInfo.userRole
  }

  constructor(private employeeService: EmployeeService, private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.updateEmployee = this.authService.retreiveUserInfo();
  }

  loadData() {
  }

  
  logTheChanges(title: any) {
    //console.log(title);
  }

  displayResetForm() {
    Swal.fire({
      title: 'You will be logged out after submitting new password and must then log in again with new password. Do you wish to proceed?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.shouldDisplay = true;
      }
    })
  }

  showHideOPassword() {
    this.showOldPassword = !this.showOldPassword;
  }

  showHideNPassword() {
    this.showNewPassword = !this.showNewPassword;
  }

  showHideConPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  updateEmpInfo() {
    //updates info in db
    //response returns updated info, which is set in session storage
    //current info is retrieved from session storage and set to currentUserInfo to show updated info to user
    //current info is also set to updateEmployee, which is two-way bound to form in template
    this.employeeService.updateEmployee(this.updateEmployee).subscribe((response) => {
      this.authService.storeUserInfo(response);
      this.currentUserInfo = this.authService.retreiveUserInfo();
      this.updateEmployee = this.authService.retreiveUserInfo();
    })
  }

  updatePassword() {
    //updates info in db
    //response returns updated info, which is set in session storage
    //current info is retrieved from session storage and set to currentUserInfo to show updated info to user
    //current info is also set to updateEmployee, which is two-way bound to form in template
    this.employeeService.updateEmployee(this.updatePwd).subscribe((response) => {
      this.router.navigate(['logout']);
    })
  }

}
