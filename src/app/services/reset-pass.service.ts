import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPassService {

  constructor(private _HttpClient:HttpClient) { }

  baseURL:string = 'https://ecommerce.routemisr.com'


  sendVerifyCode(userData:{}):Observable<any>{
    return this._HttpClient.post(this.baseURL+'/api/v1/auth/forgotPasswords',
    userData
    )
  }

  useVerifyCode(userData:{}):Observable<any>{
    return this._HttpClient.post(this.baseURL+'/api/v1/auth/verifyResetCode',
    userData
    )
  }

  resetPassword(userData:{}):Observable<any>{
    return this._HttpClient.put(this.baseURL+'/api/v1/auth/resetPassword',
    userData
    )
  }
}
