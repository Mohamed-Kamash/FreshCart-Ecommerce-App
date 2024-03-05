import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(private _Router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (localStorage.getItem('token') != null) {

      let myHeader: any = localStorage.getItem('token')

      request = request.clone({
        setHeaders: { token: myHeader }
      })
    }

    return next.handle(request);
  }
}
