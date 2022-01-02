import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn;
  constructor(private router: Router) {
    if(localStorage.getItem('isLoggedIn')){
      this.isLoggedIn = localStorage.getItem('isLoggedIn');
    }
    else {
      this.isLoggedIn = false;
    }

   }

}
