import { createAction, props } from "@ngrx/store"
import { IUser } from "src/app/models/user.model"


export const signIn = createAction('[Auth] State SignIn')
export const signOut = createAction('[Auth] State SignOut')

/* export const login = createAction('[Auth] Login', props<{user: IUser}>())
export const loginSuccess = createAction('[Auth] Login Success', props<{data: any}>())
export const loginError = createAction('[Auth] Login Failure', props<{error: any}>())

export const register = createAction('[Auth] Register',props<{user: IUser}>())
export const registerSuccess = createAction('[Auth] Register Success')
export const registerError = createAction('[Auth] Register Failure',props<{error: any}>())

export const logout = createAction('[Auth] Logout')
export const logoutSuccess = createAction('[Auth] Logout Success')
export const logoutFailure = createAction('[Auth] Logout Failure',props<{error: any}>()) */
