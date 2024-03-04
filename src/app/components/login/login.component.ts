import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  constructor(private _FormBuilder:FormBuilder , private _Router:Router , private _AuthService:AuthService){}

  isLoading:boolean = false
  serverErrorResponse:string=""


  loginForm:FormGroup = this._FormBuilder.group({
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required,]],
  })

  login():void{
    this.isLoading=true
    let userData = this.loginForm.value
    this._AuthService.login(userData).subscribe({
      next:(response)=>{
        this.isLoading=false
        if (response.message == "success") {
          localStorage.setItem('token',response.token)
          this._AuthService.saveTokenGlobal()
          this._Router.navigate(['/home'])
        }
      }
      ,error:(err)=>{
        this.isLoading=false
        this.serverErrorResponse = err.error.message
      }
    })
  }
}
