import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: User ={
    userId: 0,
    userFirstName: '',
    userLastName: '',
    userEmail: '',
    userPassword: '',
    userRole: ''
  }
  constructor(private userService: UsersService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  loginValidation(){
    this.userService.validateUser(this.user).subscribe(
      {
        next: (response) => {
          if(response != null) {
            this.authService.storeUserInfo(response);
            this.authService.isLoggedIn = true;
          if(response.userRole == "admin"){
              //set the role to admin in auth service
              this.authService.role="admin";
              // route to view-http-book
              this.router.navigate(['view-requests']);
          }else if(response.userRole == "employee"){
              //set the role to employee in auth service
              this.authService.role="employee";
              // route to display component
              this.router.navigate(['my-requests']);
          }
          }
        },
        error: (error) => {
          Swal.fire(error.error.error)
        }
      });
  }
}