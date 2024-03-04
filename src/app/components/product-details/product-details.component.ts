import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-details',
  standalone: true,
  imports: [CommonModule , CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductService:ProductService , private _CartService:CartService ,private _ToastrService:ToastrService){}

  productDetails:Product={} as Product

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        let currentID:any = params.get('idParameter')
        this._ProductService.getProductDetails(currentID).subscribe({
          next:(response)=>{
            this.productDetails = response.data        
          }
        })
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['prev', 'next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  addToCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        this._ToastrService.success(response.message)
        this._CartService.numberOfCartItems.next(response.numOfCartItems)
      }
    })
  }


}
