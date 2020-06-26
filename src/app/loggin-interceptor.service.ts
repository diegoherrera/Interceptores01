import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest
  , HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class LogginInterceptorService implements HttpInterceptor {
  constructor() { }
  private logDetails(msg: string) {
    const startTime = new Date().getHours() + ':'
      + new Date().getMinutes() + ':' + new Date().getSeconds();
    //console.log("Log " + startTime + " " + msg);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.logDetails(JSON.stringify(req));
    return next.handle(req).pipe(
      map(resp => {
        //aquí trabajaremos en la transformación
        if (resp instanceof HttpResponse) {
          this.logDetails(JSON.stringify(resp));
          return resp;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason: error && error.error && error.error.reason ? error.error.reason : '',
          status: error.status
        };
        this.logDetails(JSON.stringify(error));
        return throwError(error);
      })
    );
  }
}
