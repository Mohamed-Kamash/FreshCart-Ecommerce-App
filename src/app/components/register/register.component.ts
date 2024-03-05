import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _FormBuilder:FormBuilder , private _Router:Router , private _AuthService:AuthService){}

  isLoading:boolean = false
  serverErrorResponse:string=""

  registerForm:FormGroup = this._FormBuilder.group({
    name:["",[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]],
    rePassword:["",[]],
    phone:["",[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
  },{validators:[this.confirmPassword]})

  // rePassword Custom Validation
  confirmPassword(form:FormGroup):void{
    let password = form.get('password')
    let rePassword = form.get('rePassword')
    if (password?.value != rePassword?.value) {
      rePassword?.setErrors({notmatch:true})
    }
  }
  
  sendRegisterData():void{
    if (this.registerForm.valid) {
      this.isLoading=true
      let userData = this.registerForm.value
      // using register API
      this._AuthService.register(userData).subscribe({
        next:()=>{
          this.isLoading=false
          this._Router.navigate(['/login'])
        }
        ,error:(err)=>{
          this.isLoading=false
          this.serverErrorResponse=err.error.message
        }
      })
    }
  }

}

