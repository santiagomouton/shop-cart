import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';
import { UserService } from 'src/app/services/controllers/user.service';
import * as userActions from '../actions/users.actions';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IUser } from 'src/app/models/user';

@Injectable()
export class UsersEffects {

  constructor(
    private usersService: UserService,
    private actions$: Actions
  ) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.getUsers),
      switchMap(() => {
        return this.usersService.getUsers().pipe(
          map((users) => userActions.ApiSuccessUsers({users})),
          catchError((error) => of(userActions.ApiError({error})))
        );
      })
    );
  });

  loadUserById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.getUserById),
      switchMap((action) => {
        return this.usersService.getUserById(action.id).pipe(
          map((user: IUser) => userActions.ApiSuccessUser({user})),
          catchError((error) => of(userActions.ApiError({error})))
        )
      })
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.deleteUser),
      exhaustMap((action) => {
        return this.usersService.deleteUser(action.id).pipe(
          map((user: IUser) => userActions.getUsers()),
          catchError((error) => of(userActions.ApiError({error})))
        );
      })
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.updateUser),
      exhaustMap((action) => {
        return this.usersService.updateUser(action.user).pipe(
          map((user: IUser) => userActions.getUsers()),
          catchError((error) => of(userActions.ApiError({error})))
        );
      })
    );
  });

  postUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.postUser),
      exhaustMap((action) => {
        return this.usersService.postUser(action.user).pipe(
          map((user: IUser) => userActions.getUsers()),
          catchError((error) => of(userActions.ApiError({error})))
        );
      })
    );
  });
}
