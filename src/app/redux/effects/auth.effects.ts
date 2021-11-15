import { Injectable } from "@angular/core"
import { createEffect, Actions, ofType } from '@ngrx/effects'
import * as actions from '../actions/auth.actions'
import { catchError, map, mergeMap, switchMap, tap } from "rxjs/operators"
import { from, of } from "rxjs"
import { AuthService } from "../../services/auth.service"
import { loginError } from '../actions/auth.actions';

@Injectable()

export class AuthEffects {

    constructor (
        private auth: AuthService,
        private actions$: Actions
    ) { }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.login),
            switchMap((action) => {  // reemplazo los observables si se obtuvo exitosamente o un error
                return from(this.auth.login(action.user)).pipe( //convierto la promesa a observable
                    map((data) => actions.loginSuccess({data})),
                    catchError((error) => of (actions.loginError({error})))
                )
            })
        )
    })

    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.register),
            switchMap((action) => {  
                return from(this.auth.register(action.user)).pipe( 
                    map(() => actions.registerSuccess()),
                    catchError((error) => of (actions.registerError({error})))
                )
            })
        )
    })
/* 
    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.logout),
            switchMap((action) => {  
                return from(this.auth.logout()).pipe( 
                    map(() => actions.logoutSuccess()),
                    catchError((error) => of (actions.logoutFailure({error})))
                )
            })
        )
    }) */

}