import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/members.actions';
import { IMember } from 'src/app/models/member';

export interface MembersState {
  loading: boolean;
  members: IMember[];
  error: any;
}
export interface MemberState {
  loading: boolean;
  member: IMember;
  error: any;
}

const initialStateMembers: MembersState = {
  loading: true,
  members: [],
  error: null,
};

const initialStateMember: MemberState = {
  loading: true,
  member: null,
  error: null,
};

const _membersReducer = createReducer(
    initialStateMembers,
  on(actions.getMembers, (state, action) => ({
    loading: true
  })),
  on(actions.ApiSuccessMembers, (state, action) => ({
    members: [...action.members],
    loading: false
  })),
  on(actions.ApiError, (state, action) => ({
    members: null,
    loading: false,
    error: {
      status: action.error.status,
      message: action.error.message,
      url: action.error.url,
    }
  }))
);

export function membersReducer(state: MembersState, action: any) {
  return _membersReducer(state, action);
}

const _memberReducer = createReducer(
  initialStateMember,
  on(actions.getMemberById, (state, action) => ({
    loading: true,
  })),
  on(actions.ApiSuccessMember, (state, action) => ({
    member: action.member,
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
    member: null
  }))
);

export function memberReducer(state: MemberState, action: any) {
  return _memberReducer(state, action);
}
