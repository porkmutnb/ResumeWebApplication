import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Auth as FirebaseAuth, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private isBrowser: boolean;

  constructor(private auth: FirebaseAuth, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  isLoggedIn(): boolean {
    if (this.isBrowser) {
      const userToken = localStorage.getItem('user_token');
      return userToken !== null;
    }
    return false; // บนเซิร์ฟเวอร์, ให้ถือว่ายังไม่ได้ login
  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      signOut(this.auth).then(() => {
        localStorage.removeItem('user_token');
        resolve();
      }).catch((error) => {
        reject(error);
      });
      
    });
  }

  login(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.getIdToken().then((token) => {
          localStorage.setItem('user_token', token);
          resolve();
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }

}
