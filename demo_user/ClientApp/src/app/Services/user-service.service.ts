import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
  constructor(private httpClient:HttpClient) { }

  public UsersAll():Observable<user>{
    const url = `${this.API_SERVER}/api/User/UsersAll`;
    return this.httpClient
      .get<user>(url,this.httpOptions)
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
