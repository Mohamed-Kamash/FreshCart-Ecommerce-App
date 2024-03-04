import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'check-out',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute , private _FormBuilder:FormBuilder , private _CartService:CartService){}

  cartID:any = ""

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartID = params.get('cartID')
      }
    })
  }

  checkOutForm:FormGroup = this._FormBuilder.group({
    details:[''],
    phone:[''],
    city:[''],
  })

  getUserData():void{
    let userData = this.checkOutForm.value
    this._CartService.checkOut(this.cartID , userData ).subscribe({
      next:(response)=>{
        if (response.status == "success") {
          window.open(response.session.url,"_self")
          
        }
        console.log(response);  
      }
    })    
  }



}
