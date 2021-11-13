import { createAction, props } from "@ngrx/store"
import { IUser } from "../../models/user"

export const login = createAction('[Auth] Login',
    props<{email: string, password: string}>()
)
export const register = createAction('[Auth] Register',
    props<{name: string, email: string, password: string}>()
)
export const logout = createAction('[Auth] Logout')

export const ApiSuccess = createAction('[API] API Success', props<{ data: {}}>())
export const ApiError = createAction('[API] API Error', props<{ error: {}}>())