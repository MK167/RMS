import { AuthService } from './../../Services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm : FormGroup;
  invalidLogin : boolean = false;
  
  constructor(fb : FormBuilder, private router : Router, private AuthService: AuthService) { 
    this.loginForm = fb.group({
      email : ['',Validators.required],
      password : ['', Validators.required]
    });
  }
  get UserName(){
    return this.loginForm.get('email');
  }

  get Password(){
    return this.loginForm.get('password');
  }
  get f()
  {
    return this.loginForm.controls;
  }

  ngOnInit(): void {
  }
  signIn(){
      if(this.loginForm.controls != null || this.Password != null)
    {
      this.AuthService.isLoggedIn =true;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('CollegeID', 'CB6FC7DB-0E4E-4DB2-19F8-08D9CB28489E');
      sessionStorage.setItem('CollegeID', 'CB6FC7DB-0E4E-4DB2-19F8-08D9CB28489E');
      this.router.navigate(['/dashboard']);
    }
    else
    {
    this.loginForm.setErrors({
    invalidLogin : true
    })
    }
  }

  // login(){
  //   this.AuthService.isLoggedIn = true;
  //   localStorage.setItem('isLoggedIn', 'true');
  //   this.router.navigate(['/dashboard']);
  //   }

}
