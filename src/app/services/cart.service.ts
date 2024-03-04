import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  baseURL: string = 'https://ecommerce.routemisr.com';

  numberOfCartItems: BehaviorSubject<number> = new BehaviorSubject(0);

  addToCart(currentID: string): Observable<any> {
    return this._HttpClient.post(
      this.baseURL + '/api/v1/cart',
      { productId: currentID } //body
    );
  }

  getUserCart(): Observable<any> {
    return this._HttpClient.get(this.baseURL + '/api/v1/cart');
  }

  RemoveItem(id: string): Observable<any> {
    return this._HttpClient.delete(this.baseURL + `/api/v1/cart/${id}`);
  }

  updateCount(id: string, newCount: number): Observable<any> {
    return this._HttpClient.put(this.baseURL + `/api/v1/cart/${id}`, {
      count: newCount,
    });
  }

  checkOut(cartID: string, userData: {}): Observable<any> {
    return this._HttpClient.post(
      this.baseURL +
        `/api/v1/orders/checkout-session/${cartID}?url=https://fresh-cart-ecommerce-app-mu.vercel.app`,
      { shippingAddress: userData }
    );
  }

  getUserOrders(userID: string): Observable<any> {
    return this._HttpClient.get(this.baseURL + `/api/v1/orders/user/${userID}`);
  }
}
