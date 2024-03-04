import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlishService } from 'src/app/services/wishlish.service';
import { Product } from 'src/app/interfaces/product';
import { RouterLink } from '@angular/router';
import { SliceTextPipe } from 'src/app/pipes/slice-text.pipe';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'wish-list',
  standalone: true,
  imports: [CommonModule, RouterLink , SliceTextPipe],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit{
  constructor(private _WishlishService:WishlishService , private _CartService:CartService,private _ToastrService:ToastrService){}

  allProductResponse: Product[] = [];


  ngOnInit(): void {
    this._WishlishService.getUserWishList().subscribe({
      next:(response)=>{
        this.allProductResponse = response.data        
      },error:(err)=>{
        console.log(err);
      }
    })
  }

  addToCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message)
        this._CartService.numberOfCartItems.next(response.numOfCartItems)//editing in behavior subject
      }
    })
  }

  removeFromWishList(id:string):void{
    this._WishlishService.removeFromWishList(id).subscribe({
      next:(response)=>{
        this._WishlishService.getUserWishList().subscribe({
          next:(response)=>{
            this.allProductResponse = response.data
            this._WishlishService.wishListCount.next(response.data.length)
          },error:(err)=>{
            console.log(err);
            
          }
        })
      },error:(err)=>{console.log(err);
      }
    })    
  }

}
