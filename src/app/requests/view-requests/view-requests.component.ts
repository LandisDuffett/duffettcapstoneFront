import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from '../request.model';
import { RequestService } from '../request.service';

@Component({
  selector: 'view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {

  currentAllRequests: Request[];

  currentPendRequests: Request[];

  currentResRequests: Request[];

  requestMessage: string = "";

  pendingButton: boolean = false;

  resolvedButton: boolean = false;

  shouldDisplay: boolean = false;

  displayAll: boolean = false;

  displayPend: boolean = false;

  displayRes: boolean = false;

  displayAction: boolean = false;

  newRequest: Request = {
    requestId: 0,
    requestUserId: 0,
    requestAmount: 0,
    requestDescription: '',
    requestStatus: '',
    requestImageURL: '',
    requestTime: '',
    resolvedTime: ''
  };

  updateRequest: Request = {
    requestId: 0,
    requestUserId: 0,
    requestAmount: 0,
    requestDescription: '',
    requestStatus: '',
    requestImageURL: '',
    requestTime: '',
    resolvedTime: ''
  }

  constructor(private requestService: RequestService,
    private router: Router) {
    this.currentAllRequests = []; this.currentPendRequests = []; this.currentResRequests = []
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    //get all employee requests
    this.requestService.getAllRequests().subscribe(
      {
        next: (response) => {
          this.requestMessage = '';
          this.currentAllRequests = response;
          let currentRequests = response.sort((a, b) => (a.requestId - b.requestId));
          this.currentPendRequests = [];
          this.currentResRequests = [];
          //necessary to render bootstrap table-striped class properly (for the proper nth(odd) items in array)
          for (let item of currentRequests) {
            if (item.requestStatus == "pending")
              this.currentPendRequests.push(item);
            else if (item.requestStatus != "pending")
              this.currentResRequests.push(item);
          }
          this.displayAction = false;
          this.setButtons();
        },
        error: (error) => {
          this.requestMessage = error.error.error;
        }
      });
  }

  setButtons() {
    for (let item of this.currentAllRequests) {
      if (item.requestStatus == "pending") {
        this.pendingButton = true;
        this.displayAction = true;
        if (item.requestImageURL != null) {
        }
      }
      else if (item.requestStatus != "pending") {
        this.resolvedButton = true;
      }
    }
  }

  deleteRequest(requestId: number) {
    this.requestService.deleteRequest(requestId).subscribe((response) => {
      // we need a fresh fetch of all requests from the database
      this.loadData();
    });
  }

  editRequest(request: Request, reqStatus: string) {
    //send edit request to service and then re-fetch all requests with loadData()
    this.updateRequest.requestId = request.requestId;
    this.updateRequest.requestUserId = request.requestUserId;
    this.updateRequest.requestAmount = request.requestAmount;
    this.updateRequest.requestDescription = request.requestDescription;
    this.updateRequest.requestStatus = reqStatus;
    this.updateRequest.requestImageURL = request.requestImageURL;
    this.updateRequest.requestTime = request.requestTime;
    this.updateRequest.resolvedTime = new Date().toUTCString();
    this.requestService.updateRequest(this.updateRequest).subscribe((response) => {
      this.loadData();
    })
  }

  //toggle display of all requests
  displayAllReq() {
    this.displayAll = true;
    this.displayPend = false;
    this.displayRes = false;
  }

  //toggle display of all pending requests
  displayPendReq() {
    this.displayAll = false;
    this.displayPend = true;
    this.displayRes = false;
  }

  //toggle display of all resolved requests
  displayResReq() {
    this.displayAll = false;
    this.displayPend = false;
    this.displayRes = true;
  }

  addANewRequest() {
    this.requestService.addRequest(this.newRequest).subscribe((response) => {

      // fetch updated list of requests
      this.loadData();

      // clear the Add Form
      this.newRequest = {
        requestId: 0,
        requestUserId: 0,
        requestAmount: 0,
        requestDescription: '',
        requestStatus: '',
        requestImageURL: '',
        requestTime: '',
        resolvedTime: ''
      };

      // toggle/hide the Add Form
      this.shouldDisplay = false;
    })
  }

}
