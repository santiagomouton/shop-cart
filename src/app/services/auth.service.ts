import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IUser } from '../models/user.model';
// firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private message: NotifyService
  ) { }

  logout(): void {
    try {
      this.afAuth.signOut().then( res => {
        this.router.navigate(['/login'])
      }).catch(error => this.message.infoNotification('Ooops!', 'Ah ocurrido un error'));
    }
    catch (error) {}
  }

  async login( user: IUser ): Promise<any> {
    return await this.afAuth.signInWithEmailAndPassword(user.email, user.password)
  }

  public checkAuth(): Observable<any> {
    return this.afAuth.authState;
  }

  async register( user: IUser ): Promise<boolean> {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then( res => {
      return true;
    })
    .catch( err => {
      return false;
    })
  }

}
