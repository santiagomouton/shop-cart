import { createReducer, on } from "@ngrx/store"
import * as actions from '../actions/auth.actions'
import { IUser } from "../../models/user.model"

export interface AuthState {
    user: IUser | null,
    credential: any,
    error: any
}

const initialState: AuthState = {
    user: null,
    credential: null,
    error: null,
}

export const authReducer = createReducer(initialState,
    /*STATES FOR THE SIGNIN */
    on(actions.login, (state, action) => ({ user: action.user, error: null , credential: null})),
    on(actions.loginSuccess, (state, action) => ({ credential: action.data, user: null, error: null })),
    on(actions.loginError, (state, action) => ({ user: null, credential: null, error: action.error })),
    /*STATES FOR THE LOGOUT */
    on(actions.logout, (state, action) => ({ user: state.user, error: null , credential: state.credential})),
    on(actions.logoutSuccess, (state, action) => ({ credential: null, user: null, error: null })),
    on(actions.logoutFailure, (state, action) => ({ user: null, credential: state.credential, error: action.error })),
    /*STATES FOR THE REGISTER */
    on(actions.register, (state, action) => ({ user: null, error: null , credential: null})),
    on(actions.registerSuccess, (state, action) => ({ credential: null, user: null, error: null })),
    on(actions.registerError, (state, action) => ({ user: null, credential: null, error: action.error }))

)