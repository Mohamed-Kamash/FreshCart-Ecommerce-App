import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { cartData } from 'src/app/interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService
  ) {}

  cartItems: cartData = {} as cartData;
  cartID:string = ""

  ngOnInit(): void {
    this._AuthService.saveTokenGlobal(); // only to check there is saved token

    this._CartService.getUserCart().subscribe({
      next: (response) => {
        this.cartItems = response.data;
        this._CartService.numberOfCartItems.next(response.numOfCartItems)
        this.cartID = response.data._id
        
      },
    });
  }

  RemoveItem(id: string): void {
    this._CartService.RemoveItem(id).subscribe({
      next: (response) => {
        this.cartItems = response.data;
        this._CartService.numberOfCartItems.next(response.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateQuantity(id: string, quantity: number): void {
    this._CartService.updateCount(id, quantity).subscribe({
      next: (response) => {
        this.cartItems = response.data
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
