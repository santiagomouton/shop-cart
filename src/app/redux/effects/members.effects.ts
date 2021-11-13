import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, Effect } from '@ngrx/effects';
import { MembersService } from 'src/app/services/controllers/members.service';
import * as memberActions from '../actions/members.actions';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { IMember } from 'src/app/models/member';

@Injectable()
export class MembersEffects {

  constructor(
    private membersService: MembersService,
    private actions$: Actions
  ) {}

  loadMembers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(memberActions.getMembers),
      switchMap(() => {
        return this.membersService.getMembers().pipe(
          map((members) => memberActions.ApiSuccessMembers({members})),
          catchError((error) => of(memberActions.ApiError({error})))
        );
      })
    );
  });

  loadMemberById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(memberActions.getMemberById),
      switchMap((action) => {
        return this.membersService.getMemberById(action.id).pipe(
          map((member: IMember) => memberActions.ApiSuccessMember({member})),
          catchError((error) => of(memberActions.ApiError({error})))
        )
      })
    );
  });

  deleteMember$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(memberActions.deleteMember),
      exhaustMap((action) => {
        return this.membersService.deleteMember(action.id).pipe(
          map((member: IMember) => memberActions.getMembers()),
          catchError((error) => of(memberActions.ApiError({error})))
        );
      })
    );
  });

  updateMember$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(memberActions.updateMember),
      exhaustMap((action) => {
        return this.membersService.updateMember(action.member).pipe(
          map((member: IMember) => memberActions.getMembers()),
          catchError((error) => of(memberActions.ApiError({error})))
        );
      })
    );
  });

  postMember$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(memberActions.postMember),
      exhaustMap((action) => {
        return this.membersService.postMember(action.member).pipe(
          map((member: IMember) => memberActions.getMembers()),
          catchError((error) => of(memberActions.ApiError({error})))
        );
      })
    );
  });
}
