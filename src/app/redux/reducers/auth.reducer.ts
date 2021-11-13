import { createReducer, on } from "@ngrx/store"
import * as actions from '../actions/auth.actions'
import { IUser } from "../../models/user"

export interface AuthState {
    user: IUser,
    error: any
}

const initialState: AuthState = {
    user: null,
    error: null,
}

export const authReducer = createReducer(initialState,
    on(actions.ApiSuccess, (state, action) => ({ user: action.data, error: null })),
    on(actions.ApiError, (state, action) => ({ error: action.error, user: null })),
    on(actions.logout, (state, action) => ({
        user: null
    }))
)