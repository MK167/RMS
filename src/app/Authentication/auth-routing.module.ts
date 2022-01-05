import { SignInComponent } from './sign-in/sign-in.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component: AuthLayoutComponent,
  children:[
    {path:'', redirectTo: 'Sign-In' , pathMatch:'full'},
    {path:'Sign-In', component: SignInComponent},
]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes),
  ],

  exports: [RouterModule]
})
export class AuthRoutingModule { }
