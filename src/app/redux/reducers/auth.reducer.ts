import { createReducer, on } from "@ngrx/store"
import * as actions from '../actions/auth.actions'

export interface AuthState {
    isSignIn: boolean
}

const initialState: AuthState = {
    isSignIn: false
}

export const authReducer = createReducer(initialState,
    /*STATES FOR THE SIGNIN */
    on(actions.signIn, () => ({ isSignIn: true})),
    on(actions.signOut, () => ({ isSignIn: false}))
)