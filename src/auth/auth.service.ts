import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: firebase.User;
  displayName: string;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router) { 
      this.afAuth.authState.subscribe(user => {
        if(user){
          this.user = user;
          this.user.updateProfile({
            displayName: this.displayName
          });
          this.displayName = user.displayName;
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          localStorage.setItem('user', null);
        }
      })
    }

    async login(email: string, password: string) {
      var result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/dashboard']);
    }

    async register(email: string, password: string, username: string) {
      var result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.displayName = username;
      this.sendEmailVerification();
    }

    async sendEmailVerification() {
      (await this.afAuth.currentUser).sendEmailVerification();
      this.router.navigate(['/verification']);
    }

    async sendPasswordResetEmail(passwordResetEmail: string) {
      return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
    }

    async logout() {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }

    get isLoggedIn(): boolean {
      const user = JSON.parse(localStorage.getItem('user'));
      return user !== null;
    }
}
