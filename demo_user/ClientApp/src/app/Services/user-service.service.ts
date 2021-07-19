import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { paginator_request } from '../Models/UserModel/paginator_request';
import { user } from '../Models/UserModel/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private API_SERVER = "https://localhost:5001";
  constructor(private httpClient:HttpClient, private router:Router) { }

  public UsersAll():Observable<user>{
    const url = `${this.API_SERVER}/api/User/UsersAll`;
    return this.httpClient
      .get<user>(url,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public PaginatorUser(_pageRequest:paginator_request): Observable<any>{
    const url = `${this.API_SERVER}/api/User/GetPaginatorUser`;
    return this.httpClient
      .post<paginator_request>(url,_pageRequest,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public AddUser(_user:user): Observable<user>{
    const url = `${this.API_SERVER}/api/User/CreateUser`;
    return this.httpClient
      .post<user>(url,_user,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public UpdateUser(_user:user): Observable<user>{
    const url = `${this.API_SERVER}/api/User/UpdateUser`;
    return this.httpClient
      .put<user>(url,_user,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public DeleteUser(_user:user): Observable<user>{
    const url = `${this.API_SERVER}/api/User/DeleteUser?userId=${_user.id}`;
    return this.httpClient
      .delete<any>(url,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error:HttpErrorResponse){
    return throwError(error.status);
  }

}
