import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";

@Injectable()
export class headerInterceptor implements HttpInterceptor {
    constructor(public router: Router){}
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
        ): Observable<HttpEvent<any>> {
        if(localStorage.getItem('access_token') != null){
            const token = localStorage.getItem('access_token') ?? '';
            const headers = new HttpHeaders()
              .set('access_token',token)
              .set('Authorization','Bearer ' + token);
            const AuthReqest = request.clone({ headers:headers });
            return next.handle(AuthReqest);
        }else{
          return next.handle(request);
        }
    }
}
