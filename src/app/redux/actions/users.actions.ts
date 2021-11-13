import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/models/user';

export const getUsers = createAction('[User List/Api] Store users');

export const getUserById = createAction('[User] Get', props<{id: number}>());

export const postUser = createAction(
  '[User] Post',
  props<{ user: IUser}>()
);

export const updateUser = createAction(
  '[User] Update',
  props<{user: IUser}>()
);

export const deleteUser = createAction(
  '[User] Delete',
  props<{ id: number }>()
);

export const ApiSuccessUsers = createAction(
  '[User List/Api] API Success',
  props<{ users: IUser[] }>()
);
export const ApiSuccessUser = createAction(
  '[User] Get Success Success',
  props<{ user: IUser }>()
);
export const ApiError = createAction(
  '[API] API Error', 
  props<{ error }>());
