import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResetPassService } from 'src/app/services/reset-pass.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _ResetPassService: ResetPassService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {}

  isLoading: boolean = false;
  phase1: boolean = true;
  phase2: boolean = false;
  phase3: boolean = false;
  userEmail: string = '';
  serverErrorResponse: string = '';

  sendCodeInput: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required]],
  });

  verifyCodeInput: FormGroup = this._FormBuilder.group({
    resetCode: [''],
  });

  resetPasswordInput: FormGroup = this._FormBuilder.group({
    newPassword: ['', [Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]],
  });

  sendCode(): void {
    let userData: {} = this.sendCodeInput.value;
    this.userEmail = this.sendCodeInput.value.email;
    this.isLoading = true;

    this._ResetPassService.sendVerifyCode(userData).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this.phase1 = false;
        this.phase2 = true;
        this.isLoading = false;
        this.serverErrorResponse = '';
      },
      error: (err) => {
        this.serverErrorResponse = err.error.message;
        this.isLoading = false;
      },
    });
  }

  verifyCode(): void {
    let userData: {} = this.verifyCodeInput.value;
    this.isLoading = true;

    this._ResetPassService.useVerifyCode(userData).subscribe({
      next: () => {
        this.phase2 = false;
        this.phase3 = true;
        this.isLoading = false;
        this.serverErrorResponse = '';
      },
      error: (err) => {
        this.serverErrorResponse = err.error.message;
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  resetPassword(): void {
    let userData = this.resetPasswordInput.value;
    userData.email = this.userEmail;
    this.isLoading = true;

    this._ResetPassService.resetPassword(userData).subscribe({
      next: () => {
        this.isLoading = false;
        this.serverErrorResponse = '';
        this._Router.navigate(['/login']);
      },
      error: (err) => {
        this.serverErrorResponse = err.error.message;
        this.isLoading = false;
      },
    });
  }
}
