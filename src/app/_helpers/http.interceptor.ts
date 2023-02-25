import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StorageService } from '../_services/storage.service';
import { EventBusService } from '../_shared/event-bus.service';
import { EventData } from '../_shared/event.class';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private localStorageService:StorageService,private router:Router){

  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {

      //handle your auth error or rethrow
      if (err.status === 403) {
        return throwError(() => err);
      }else if(err.status === 500){
        return throwError(() => err);
      }else if(err.status === 401){
        return throwError(() => err);
      }else if(err.status === 404){
        return throwError(() => err);
      }else if(err.status === 0){
        return throwError(() => err);
      }
      return throwError(() => err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      //add the jwt token (LocalStorage) request
      let authReq=req;
      const token=this.localStorageService.getToken();

      if(token !=null){
          authReq=authReq.clone({
              setHeaders:{Authorization:`Bearer ${token}`},
          });

      }
      return next.handle(authReq).pipe(catchError(x=> this.handleAuthError(x)));
  }

}

export const authInterceptorProviders=[
  {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
  }
];
