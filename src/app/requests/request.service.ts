import { Injectable } from '@angular/core';
import { Request } from './request.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  //baseUrl: string = "http://localhost:7474/api/requests";
  baseUrl: string = environment.apiUrl+"/api/requests";
  
  constructor(private http: HttpClient) { }

  getAllRequests(): Observable<Request[]>{
    return this.http.get<Request[]>(this.baseUrl);
  }

  deleteRequest(requestId: number): Observable<boolean>{
    return this.http.delete<boolean>(this.baseUrl+'/'+requestId);
  }

  addRequest(newRequest: Request): Observable<Request>{
    return this.http.post<Request>(this.baseUrl, newRequest);
  }

  getARequest(requestId: any): Observable<Request>{
    return this.http.get<Request>(this.baseUrl+'/'+requestId);
  }

  updateRequest(sentRequest: Request): Observable<Request>{
    return this.http.put<Request>(this.baseUrl, sentRequest);
  }

  //get all requests for a specific employee
  getEmpReqs(userId:number): Observable<any[]>{
    return this.http.get<any[]>(this.baseUrl+"/userid/"+userId)
  }
  
}
