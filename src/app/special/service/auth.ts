import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  Auth as FirebaseAuth,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private isBrowser: boolean;

  constructor(
    private auth: FirebaseAuth,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  isLoggedIn(): boolean {
    if (this.isBrowser) {
      const userToken = localStorage.getItem('user_token');
      const googleToken = localStorage.getItem('google_access_token');
      return userToken !== null && googleToken !== null;
    }
    return false; // บนเซิร์ฟเวอร์, ให้ถือว่ายังไม่ได้ login
  }

  logout(): Promise<void> {
    localStorage.removeItem('google_access_token');
    return new Promise((resolve, reject) => {
      signOut(this.auth)
        .then(() => {
          localStorage.removeItem('user_token');
          resolve();
        })
        .catch((error) => {
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
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    // ขอสิทธิ์ในการเข้าถึง Google Drive (แบบอ่านอย่างเดียว)
    provider.addScope('https://www.googleapis.com/auth/drive.readonly');

    return new Promise((resolve, reject) => {
      signInWithPopup(this.auth, provider)
        .then((result) => {
          // ได้ Credential สำหรับการเข้าถึง Google API
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const accessToken = credential?.accessToken;

          if (accessToken) {
            localStorage.setItem('google_access_token', accessToken);
            resolve();
          } else {
            reject('Could not get Google Access Token.');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getGoogleAccessToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('google_access_token');
    }
    return null;
  }
}
