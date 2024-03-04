import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlishService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL: string = 'https://ecommerce.routemisr.com';

  wishListCount:BehaviorSubject<number> = new BehaviorSubject (0)

  addToWishList(id:string): Observable<any> {
    return this._HttpClient.post(this.baseURL + '/api/v1/wishlist',
    {
      productId: id,
    });
  }

  getUserWishList():Observable<any>{
    return this._HttpClient.get(this.baseURL+'/api/v1/wishlist')
  }

  removeFromWishList(id:string):Observable<any>{
    return this._HttpClient.delete(this.baseURL+`/api/v1/wishlist/${id}`)
  }
}
