import { AuthguardGuard } from './Services/Guards/authguard.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

const routes: Routes =[
 {path: '', redirectTo: 'auth', pathMatch:'full'},
  {
    path:'auth',
    loadChildren:() => import('./Authentication/auth.module')
    .then(m=>m.AuthModule)
  },
  {
    path: '', component: AdminLayoutComponent,
    children: 
    [{
    path:'',
    loadChildren:() => import('./layouts/admin-layout/admin-layout.module')
    .then(m => m.AdminLayoutModule),canActivate:[AuthguardGuard] 
    }]
  },
{
  path:'**', component:NotFoundComponent
}  
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
