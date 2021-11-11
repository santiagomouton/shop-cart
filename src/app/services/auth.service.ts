import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { PrivateApiServiceService } from './private-api-service.service';
import { Router } from '@angular/router';
import { IGoogleUser } from '../models/google-user';
// firebase
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  API_URL: string = environment.BASE_API_URL;
  user$: Observable<IGoogleUser>;

  constructor(
    private http: PrivateApiServiceService,
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user: IGoogleUser) => {
        if (user) {
          return this.afs.doc<IGoogleUser>(`users/${user.uid}`).valueChanges().pipe(
            tap(() => this.router.navigate(['/public/home']))
          );
        } else {
          return of(null);
        }
      })
    );
  }

  async loginGoogle() {
    try {
      const userCredentials = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.router.navigate(['/public/home']);
      return this.updateUserData(userCredentials.user);
    }
    catch (error){
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      await this.router.navigate(['/login']);
    }
    catch (error) {}
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<IGoogleUser> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    console.log(data);

    return userRef.set(data, {merge: true});
  }

  login(name: string, password: string): Observable<any> {
    localStorage.setItem('user', JSON.stringify({
      name,
      password
    }));
    return this.http.post(`${this.API_URL}/login`, {name, password});
  }

  register(name: string, email: string, password: string): Observable<any> {
    localStorage.setItem('user', JSON.stringify({
      name,
      email,
      password
    }));
    return this.http.post(`${this.API_URL}/register`, {name, email, password});
  }
}
