import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
// firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import 'firebase/auth';
// import firebase from '@firebase/app';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  // API_URL: string = environment.BASE_API_URL;

  constructor(
    private afAuth: AngularFireAuth,
    public router: Router
  ) { }

  async logout() {
    try {
      await this.afAuth.signOut();
      await this.router.navigate(['/login']);
    }
    catch (error) {}
  }

  async login(email: string, password: string): Promise<boolean> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
    .then( res => {
      console.log(res);
      sessionStorage.setItem('user', JSON.stringify({uid: res.user?.uid}))
      return true;
    })
    .catch( err => {
      console.log(err);
      return false;
    })
  }

/*   register(name: string, email: string, password: string): Observable<any> {
    localStorage.setItem('user', JSON.stringify({
      name,
      email,
      password
    }));
    return this.http.post(`${this.API_URL}/register`, {name, email, password});
  } */
}
