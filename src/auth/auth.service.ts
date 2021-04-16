import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import 'rxjs/add/operator/toPromise';
import { subscribeToPromise } from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: firebase.User;
  displayName: string;
  coins;
  symbol: string;
  num;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private afs: AngularFirestore) { 
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
      });
      
    }

    async login(email: string, password: string) {
      var result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/dashboard']);
    }

    async register(email: string, password: string, username: string) {
      var result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.displayName = username;
      this.afs.collection("users").doc(this.displayName).set({});
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

    addToFavs(sym) {
    this.afs.collection("users").doc(this.displayName).update({
      coins: firebase.firestore.FieldValue.arrayUnion(sym)
    });
    }

    removeFromFavs(sym) {
      this.afs.collection("users").doc(this.displayName).update({
        coins: firebase.firestore.FieldValue.arrayRemove(sym)
      });
    }

   getCoins() {
    this.afs.collection("users").doc(this.displayName).get()
    .toPromise().then((doc) => {
      this.coins = Object.entries(doc.data());
      console.log(this.coins);
    })

    //  var sym = "BTC";
    //  var query = this.afs.collection("users", ref => ref.where("coins", "array-contains", sym));
    //  query.get()
    //  .toPromise().then((querySnapshot) => {
    //    querySnapshot.forEach((doc) => {
    //      this.coins = Object.entries(doc.data());
    //      console.log(this.coins);
    //    });
    //  });
    }
}
