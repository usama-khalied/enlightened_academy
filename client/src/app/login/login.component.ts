import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = 'admin';
  userpassword: string = 'Admin123456';
  loginForm!: FormGroup;
  passwordInputType: string = '';
  loading: boolean = false;

  constructor(public formBuilder: FormBuilder, private route: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember: false,
    });
  }

  ngOnInit(): void {
    this.createLoginForm();
    this.passwordInputType = 'password';
  }

  forgotPassword() {
    console.log('Forgot Password feature currently unavailable.');
  }

  private createLoginForm() {
 
  }

  login() {
    // Handle login functionality
  }
}