import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/users.actions';
import { IUser } from '../../models/user';

export interface UsersState {
  loading: boolean;
  users: IUser[];
  error: any;
}
export interface UserState {
  loading: boolean;
  user: IUser;
  error: any;
}

const initialStateUsers: UsersState = {
  loading: true,
  users: [],
  error: null,
};

const initialStateUser: UserState = {
  loading: true,
  user: null,
  error: null,
};

const _usersReducer = createReducer(
  initialStateUsers,
  on(actions.getUsers, (state, action) => ({
    loading: true
  })),
  on(actions.ApiSuccessUsers, (state, action) => ({
    users: [...action.users],
    loading: false
  })),
  on(actions.ApiError, (state, action) => ({
    users: null,
    loading: false,
    error: {
      status: action.error.status,
      message: action.error.message,
      url: action.error.url,
    }
  }))
);

export function usersReducer(state: UsersState, action: any) {
  return _usersReducer(state, action);
}

const _userReducer = createReducer(
  initialStateUser,
  on(actions.getUserById, (state, action) => ({
    loading: true,
  })),
  on(actions.ApiSuccessUser, (state, action) => ({
    user: action.user,
    loading: false,
    error: null
  })),
  on(actions.ApiError, (state, action) => ({ 
    loading: false,
    error: {
      status: action.error.status,
      message: action.error.message,
      url: action.error.url,
    },
    user: null
  }))
);

export function userReducer(state: UserState, action: any) {
  return _userReducer(state, action);
}


