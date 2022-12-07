import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = environment.apiUrl+"/api/users";
  //baseUrl: string = "http://localhost:7474/api/users";
  
  constructor(private http: HttpClient) { }

  /*
  validateUser(user: User): Observable<User>{
    return this.http.post<User>(this.baseUrl, user);
  }*/

  validateUser(user: User): Observable<User>{
    return this.http.post<User>(this.baseUrl+"/email/password", user);
  }

}
