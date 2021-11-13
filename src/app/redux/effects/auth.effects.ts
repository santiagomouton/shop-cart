import { Injectable } from "@angular/core"
import { createEffect, Actions, ofType } from '@ngrx/effects'
import * as actions from '../actions/auth.actions'
import { catchError, map, mergeMap, tap } from "rxjs/operators"
import { of } from "rxjs"
import { AuthService } from "../../services/auth.service"

@Injectable()

export class AuthEffects {

    constructor (
        private auth: AuthService,
        private actions$: Actions
    ) { }

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.login),
            mergeMap((action) => {
                return this.auth.login(action.email, action.password).pipe(
                    map(res => actions.ApiSuccess({ data: res.data })),
                )
            })
        )
    })

    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.register),
            mergeMap((action) => {
                return this.auth.register(action.name, action.email, action.password).pipe(
                    map(res => actions.ApiSuccess({ data: res.data}))
                )
            })
        )
    })
}