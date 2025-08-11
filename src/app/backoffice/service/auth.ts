import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor() { }

  static isLoggedIn(): boolean {
    // const userToken = localStorage.getItem('user_token');
    var isAuth = true
    // if(userToken!=null) {
    //   isAuth = true;
    // }
    return isAuth;
  }

  logout() {
    // localStorage.removeItem('user_token');
  }

}
