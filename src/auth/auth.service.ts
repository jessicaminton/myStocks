import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  displayName: string;
  coins: any;
  symbol: string;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private afs: AngularFirestore) { 
      //initializes the user and sets th local storage which doesnt even matter because its a mobile app bye
      this.afAuth.authState.subscribe(user => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
        } else {
          localStorage.setItem('user', null);
        }
      });
    }

    //takes the email and password inputted and verifies it exists in firebase then routes the user to the main dashboard
    async login(email: string, password: string) {
      var result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.afAuth.authState.subscribe(user => {
        this.displayName = user.displayName
      });
      this.router.navigate(['/dashboard']);
    }

    //takes the email, password, and username inputted and creates an account for the user and sets the display name is firebase
    async register(email: string, password: string, username: string) {
      var result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.afAuth.authState.subscribe(user => {
        user.updateProfile({
          displayName: username
        });
      });
      //initializes a coins array in firestore under the users display name
      this.afs.collection("users").doc(username).set({
        coins: []
      });
      this.sendEmailVerification();
    }

    //sends the user an email confirmation once the register
    async sendEmailVerification() {
      (await this.afAuth.currentUser).sendEmailVerification();
      this.router.navigate(['/verification']);
    }

    //logs the user out and removes their info from the local storage which again doesnt even matter
    async logout() {
      await this.afAuth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    }

    //adds the symbol to the users favorites in firebase
    addToFavs(sym) {
    this.afs.collection("users").doc(this.displayName).update({
      coins: firebase.firestore.FieldValue.arrayUnion(sym)
    });
    }

    //removes the symbol from the users favorites list in firestore
    removeFromFavs(sym) {
      this.afs.collection("users").doc(this.displayName).update({
        coins: firebase.firestore.FieldValue.arrayRemove(sym)
      });
    }

    //gets the array of cryptos saved by the user from firebase
    getCoins() {
    this.afs.collection("users").doc(this.displayName).get()
    .toPromise().then((doc) => {
      this.coins = Object.entries(doc.data());
      console.log(this.coins);
    });
    }
}
