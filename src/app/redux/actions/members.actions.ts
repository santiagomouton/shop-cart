import { createAction, props } from '@ngrx/store';
import { IMember } from 'src/app/models/member';

export const getMembers = createAction('[Member List/Api] Store members');

export const getMemberById = createAction('[Member] Get', props<{id: number}>());

export const postMember = createAction(
  '[Member] Post',
  props<{ member: IMember}>()
);

export const updateMember = createAction(
  '[Member] Update',
  props<{member: IMember}>()
);

export const deleteMember = createAction(
  '[Member] Delete',
  props<{ id: number }>()
);

export const ApiSuccessMembers = createAction(
  '[Member List/Api] API Success',
  props<{ members: IMember[] }>()
);
export const ApiSuccessMember = createAction(
  '[Member] Get Success Success',
  props<{ member: IMember }>()
);
export const ApiError = createAction(
  '[API] API Error', 
  props<{ error }>());
