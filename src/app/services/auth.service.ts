import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient, private _Router:Router) {}

  baseURL: string = 'https://ecommerce.routemisr.com';
  globalToken: string | null = null;

  //save global token
  saveTokenGlobal(): void {
    if (localStorage.getItem('token') != null) {
      this.globalToken = localStorage.getItem('token');
    }else{this._Router.navigate(['/login'])}
  }

  // register
  register(userData: any): Observable<any> {
    return this._HttpClient.post(
      this.baseURL + '/api/v1/auth/signup',
      userData
    );
  }

  // login
  login(userData: any): Observable<any> {
    return this._HttpClient.post(
      this.baseURL + '/api/v1/auth/signin',
      userData
    );
  }




  
}
