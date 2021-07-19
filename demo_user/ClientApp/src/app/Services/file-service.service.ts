import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { file } from '../Models/FileModel/file';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private API_SERVER = "https://localhost:5001";
  constructor(private httpClient:HttpClient) { }

  public GetFilesByUserId(_id:number):Observable<any>{
    const url = `${this.API_SERVER}/api/File/GetFilesByUserId?request=${_id}`;
    return this.httpClient
      .get<any>(url,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public AddFile(_file:file): Observable<file>{
    const url = `${this.API_SERVER}/api/File/CreateFile`;
    return this.httpClient
      .post<file>(url,_file,this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error:HttpErrorResponse){
    return throwError(error.status);
  }
}
