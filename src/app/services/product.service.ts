import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  baseURL: string = 'https://ecommerce.routemisr.com';

  getAllProducts(page:number = 1):Observable<any>{
    return this._HttpClient.get(this.baseURL+`/api/v1/products?page=${page}`)
  }

  getProductDetails(id:string):Observable<any>{
    return this._HttpClient.get(this.baseURL+`/api/v1/products/${id}`)
  }

  
}
