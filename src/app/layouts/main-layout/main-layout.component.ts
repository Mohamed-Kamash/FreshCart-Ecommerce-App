import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { WishlishService } from 'src/app/services/wishlish.service';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  constructor(private _Router: Router, private _CartService: CartService , private _Renderer2:Renderer2 , private _WishlishService:WishlishService) {}

  myCart: number = 0;

  wishListCount:number = 0;

  ngOnInit(): void {
    // always keep listenning
    this._CartService.numberOfCartItems.subscribe({
      next: (data) => {
        this.myCart = data;
      },
    });

    this._WishlishService.wishListCount.subscribe({
      next:(data)=>{
        this.wishListCount = data
      }
    })

    // call get cart API upon refresh mainLayout
    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this._CartService.numberOfCartItems.next(response.numOfCartItems);
      },
    });

    this._WishlishService.getUserWishList().subscribe({
      next:(response)=>{
        this._WishlishService.wishListCount.next(response.count)
      }
    })


  }

  logOut(): void {
    localStorage.removeItem('token');
    this._Router.navigate(['/login']);
  }

  @ViewChild('mainNav') mainNav!:ElementRef
  @HostListener('window:scroll')
  onScroll():void{
    if (scrollY > 400) {
      this._Renderer2.addClass(this.mainNav.nativeElement,'p-3')
      this._Renderer2.addClass(this.mainNav.nativeElement,'shadow-lg')
    }else{
      this._Renderer2.removeClass(this.mainNav.nativeElement,'p-3')
      this._Renderer2.removeClass(this.mainNav.nativeElement,'shadow-lg')
    }
  }


  autoClose():void{
    document.querySelector("#navbarSupportedContent")?.classList.remove("show")    
  }
  
  

}



