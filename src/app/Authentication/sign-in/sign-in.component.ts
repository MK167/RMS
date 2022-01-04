import { AuthService } from './../../Services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginService } from '../../Services/user-login.service';
import { User } from '../../Models/RMS-Models/User';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm : FormGroup;
  invalidLogin : boolean = false;
  _Users : User[];

  constructor(fb : FormBuilder, private router : Router, private AuthService: AuthService, private UserLoginService: UserLoginService) { 
    this.loginForm = fb.group({
      username : ['',Validators.required],
      password : ['', Validators.required]
    });
  }
  get UserName(){
    return this.loginForm.get('username');
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
    this.UserLoginService.GetUserData(this.UserName.value,this.Password.value)
    .subscribe(Users => {
      this._Users = Users;
      if(this._Users != null && this.loginForm.controls != null)
    {
      this.AuthService.isLoggedIn =true;
      localStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('CollegeID', this._Users['collegeID']);
      this.router.navigate(['/dashboard']);
    }
    else
    {
    this.loginForm.setErrors({
    invalidLogin : true
    })
    }
  });      
}
}  

  // login(){
  //   this.AuthService.isLoggedIn = true;
  //   localStorage.setItem('isLoggedIn', 'true');
  //   this.router.navigate(['/dashboard']);
  //   
