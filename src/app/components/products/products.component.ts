import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { SliceTextPipe } from 'src/app/pipes/slice-text.pipe';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { WishlishService } from 'src/app/services/wishlish.service';

@Component({
  selector: 'products',
  standalone: true,
  imports: [CommonModule, SliceTextPipe, RouterLink, FormsModule, SearchPipe , NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private _ProductService: ProductService , private _CartService:CartService , private _ToastrService:ToastrService , private _WishlishService:WishlishService) {}

  searchTerm:string=""

  myWishListItems:string[]=[]


  allProductResponse: Product[] = [];
  pageSize:number=0
  currentPage:number=0
  totalItems:number=0



  ngOnInit(): void {
    this._ProductService.getAllProducts().subscribe({
      next: (response) => {
        this.allProductResponse = response.data;
        this.pageSize = response.metadata.limit
        this.currentPage = response.metadata.currentPage
        this.totalItems = response.results
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._WishlishService.getUserWishList().subscribe({
      next:(response)=>{        
        this.myWishListItems = response.data.map( (items:any)=>items._id ) // converting array of object to array of strings [id,id]
    }})
  }

  addToCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message)
        this._CartService.numberOfCartItems.next(response.numOfCartItems)
      }
    })
  }

  pageChanged(event:any):void{
    this._ProductService.getAllProducts(event).subscribe({
      next: (response) => {
        this.allProductResponse = response.data;
        this.pageSize = response.metadata.limit
        this.currentPage = response.metadata.currentPage
        this.totalItems = response.results
      },
      error: (err) => {
        console.log(err);
      },
    });
    
  }

  addToWishList(id:string):void{
    this._WishlishService.addToWishList(id).subscribe({
      next:(response)=>{
        this._WishlishService.wishListCount.next(response.data.length)
        this.myWishListItems = response.data
        this._ToastrService.success(response.message)        
      },error:(err)=>{
        console.log(err); 
      }
    })

    
  }

  removeFromWishList(id:string):void{
    this._WishlishService.removeFromWishList(id).subscribe({
      next:(response)=>{
        this.myWishListItems = response.data
        this._WishlishService.wishListCount.next(response.data.length)
      },error:(err)=>{console.log(err);
      }
    })    
  }



}
