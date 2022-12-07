import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from '../request.model';
import { RequestService } from '../request.service';
import { AuthService } from 'src/app/users/auth.service';

@Component({
  selector: 'my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {

  currentMyRequests: Request[];

  currentPendRequests: Request[];

  currentResRequests: Request[];

  shouldDisplay: boolean = false;

  pendingButton: boolean = false;

  resolvedButton: boolean = false;
  
  currentUser = this.authService.retreiveUserInfo();

  myRequestMessage: string = '';

  newRequest: Request = {
    requestId: 0,
    requestUserId: this.currentUser.userId,
    requestAmount: 0,
    requestDescription: '',
    requestStatus: 'pending',
    requestImageURL: '',
    requestTime: new Date().toUTCString(),
    resolvedTime: ''
  };

  displayAll: boolean = false;

  displayPend: boolean = false;
  
  displayRes: boolean = false;

  constructor(private requestService: RequestService, private router: Router, private authService: AuthService) { 
    this.currentMyRequests = []; this.currentPendRequests = []; this.currentResRequests = []
}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    let usr = this.authService.retreiveUserInfo();
    let usrid = usr.userId;
    //get all requests for the currently logged in employee
    this.requestService.getEmpReqs(usrid).subscribe(
      {
        next: (response) => {
          this.myRequestMessage = '';
          this.currentMyRequests = response;
          for(let item of response) {
            if(item.requestStatus == "pending") 
            this.currentPendRequests.push(item);
            else if(item.requestStatus != "pending")
            this.currentResRequests.push(item)
          }
          this.setButtons();
        },
        error: (error) => {
          this.myRequestMessage = error.error.error;
        }
      });
  }

  setButtons() {
    for(let item of this.currentMyRequests) {
      if(item.requestStatus == "pending") {
        this.pendingButton = true;
      }
      else if(item.requestStatus != "pending") {
        this.resolvedButton = true;
      }
    }
  }

  //toggle display of all requests
  displayAllMyReq(){
    this.displayAll = true;
    this.displayPend = false;
    this.displayRes = false;
  }

  //toggle display of pending requests
  displayMyPendReq(){
    this.displayAll = false;
    this.displayPend = true;
    this.displayRes = false;
  }

  //toggle display of resolved requests
  displayMyResReq(){
    this.displayAll = false;
    this.displayPend = false;
    this.displayRes = true;
  }

  //toggle display of submit new request form
  displayReqForm(){
    if(this.shouldDisplay){
      this.shouldDisplay = false;
    }else{
      this.shouldDisplay = true;
    }
  }

  addANewRequest(){
    this.requestService.addRequest(this.newRequest).subscribe((response)=>{
      
       // we need a fresh fetch of all requests from the database
      this.loadData();

      // clear the Add Form
      this.newRequest = {
        requestId: 0,
        requestUserId: this.currentUser.userId,
        requestAmount: 0,
        requestDescription: '',
        requestStatus: 'pending',
        requestImageURL: '',
        requestTime: new Date().toUTCString(),
        resolvedTime: ''
      };

      // toggle/hide the Add Form
      this.shouldDisplay = false;
    })
  }

}
