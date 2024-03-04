import { CommonModule } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { SliceTextPipe } from 'src/app/pipes/slice-text.pipe';
import { ProductService } from 'src/app/services/product.service';
import { CategorySliderComponent } from './category-slider/category-slider.component';
import { MainSliderComponent } from './main-slider/main-slider.component';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlishService } from 'src/app/services/wishlish.service';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    CommonModule,
    MainSliderComponent,
    CategorySliderComponent,
    SliceTextPipe,
    RouterLink,
    FormsModule,
    SearchPipe,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _ProductService: ProductService , private _CartService:CartService,private _ToastrService:ToastrService , private _Renderer2:Renderer2 , private _WishlishService:WishlishService) {}

  searchTerm:string=""

  allProductResponse: Product[] = [];

  myWishListItems:string[]=[]

  ngOnInit(): void {
    this._ProductService.getAllProducts().subscribe({
      next: (response) => {
        this.allProductResponse = response.data;
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
        this._CartService.numberOfCartItems.next(response.numOfCartItems)//editing in behavior subject
        
      }
    })
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
