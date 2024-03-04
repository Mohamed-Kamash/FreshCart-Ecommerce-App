import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {

  constructor(private _CartService:CartService){}

  userID:string = ''

  userOrders:any[]=[]

  ngOnInit(): void {
    if (localStorage.getItem("token") !== null) {
      let token:any = localStorage.getItem("token")
      let encodedUserInfo:any = jwtDecode(token)
      this.userID = encodedUserInfo.id
    }

    this._CartService.getUserOrders(this.userID).subscribe({
      next:(response)=>{
        this.userOrders = response
      }
    })


  }





}
