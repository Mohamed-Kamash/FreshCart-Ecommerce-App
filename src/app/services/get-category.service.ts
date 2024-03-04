import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCategoryService {

  constructor(private _HttpClient:HttpClient) { }

  baseURL: string = 'https://ecommerce.routemisr.com';

  getAllCategories():Observable<any>{
    return this._HttpClient.get(this.baseURL+'/api/v1/categories')
  }

  getSubCategory(subCatID:string):Observable<any>{
    return this._HttpClient.get(this.baseURL+`/api/v1/categories/${subCatID}/subcategories`)
  }

}
