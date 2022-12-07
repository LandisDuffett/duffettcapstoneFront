import { Injectable } from '@angular/core';
import { User } from '../users/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //baseUrl: string = "http://localhost:7474/api/users";
  baseUrl: string = environment.apiUrl+"/api/users";
  
  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl);
  }

  getEmpReqs(userId:number): Observable<any[]>{
    //fetch to request endpoint is needed in this component to allow displaying requests by employee
    return this.http.get<any[]>(environment.apiUrl+"/api/requests/userid"+"/"+userId)
    //return this.http.get<any[]>("http://localhost:7474/api/requests/userid"+"/"+userId)
  }

  deleteEmployee(userId: number): Observable<boolean>{
    return this.http.delete<boolean>(this.baseUrl+'/'+userId);
  }

  addEmployee(newEmployee: User): Observable<User>{
    return this.http.post<User>(this.baseUrl, newEmployee);
  }

  getAnEmployee(userId: any): Observable<User>{
    return this.http.get<User>(this.baseUrl+'/'+userId);
  }

  updateEmployee(sentEmployee: User): Observable<User>{
    return this.http.put<User>(this.baseUrl, sentEmployee);
  }

  updateRequest(request: any) {
    //allows approving/denying a request for a specific employee
    //return this.http.put<any>("http://localhost:7474/api/requests", request)
    return this.http.put<any>(environment.apiUrl+"/api/requests", request)
  }
}
