import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInComponent } from './sign-in/sign-in.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NgxSpinnerModule ,
    NgHttpLoaderModule.forRoot(),
  ]
})
export class AuthModule { }
