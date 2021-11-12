import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { take, switchMap } from "rxjs/internal/operators";
import { authState } from 'rxfire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: AngularFireAuth ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.auth.authState.pipe(
      take(1),
      switchMap( async (authState)=> {
        if(authState){
          return true;
        }
        else {
          console.log('no autenticado');
          return false;
        }
      })
    )
  }
  
}
