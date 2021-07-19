import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
   private API_SERVER = "https://localhost:5001";

  constructor(private router: Router, private httpClient: HttpClient) { }

  public setToken(token:string){
    localStorage.setItem('access_token',token);
  }
  public removeToken(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('userId');
  }
  public getToken(){
    return localStorage.getItem('access_token');
  }

  public isAuth(): boolean {
    const token = this.getToken();
    if(token === null){
      return false;
    }
    return true;
  }
  public logout(){
    this.removeToken();
    this.router.navigate(['/login']);
  }


  public login(userName:string, Password:string):Observable<any>{
    const url = `${this.API_SERVER}/api/Auth/Login`;
    let User = {
      username: userName,
      password: Password
    }
    return this.httpClient
      .post<any>(url,User,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error:HttpErrorResponse){
    return throwError(error.status);
  }
}
