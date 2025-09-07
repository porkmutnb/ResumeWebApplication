import { Injectable } from '@angular/core';
import { Auth as FirebaseAuth, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class Auth {

  constructor(private auth: FirebaseAuth) { }

  static isLoggedIn(): boolean {
    const userToken = localStorage.getItem('user_token');
    return userToken !== null;
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
