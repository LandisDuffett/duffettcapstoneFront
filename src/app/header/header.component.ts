import { Component, OnInit } from '@angular/core';
import { AuthService } from '../users/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  shouldDisplay: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  hasLoggedIn(){
    return this.authService.isLoggedIn;
  }

  getRole(){
    return this.authService.role;
  }

  displayBookForm(){
    if(this.shouldDisplay){
      this.shouldDisplay = false;
    }else{
      this.shouldDisplay = true;
    }
  }

}
