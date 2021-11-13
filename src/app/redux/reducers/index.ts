import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { authReducer, AuthState } from './auth.reducer';
import { slidesReducer, SlidesState } from './slides.reducer';
import {activityReducer, ActivityState} from './activities.reducer'
import { usersReducer, userReducer, UserState, UsersState } from "./users.reducer";
import { SidenavState, sidenavReducer } from './sidenav.reducer';
import { membersReducer, memberReducer, MemberState, MembersState } from './members.reducer';

/**
 * Add here the your reducer for import in app.module.
 */
export const reducers = {
  slidesReducer,
  authReducer,
  activityReducer,
  usersReducer,
  userReducer,
  sidenavReducer,
  membersReducer,
  memberReducer
};

/**
 * whit this you can specify the type in Store in your component ***** ( public store: Store<IStates> ) 
 */
export interface IStates{
  authReducer: AuthState;
  slidesReducer: SlidesState;
  activityReducer: ActivityState;
  usersReducer: UsersState;
  userReducer: UserState;
  sidenavReducer: SidenavState
  memberReducer: MemberState;
  membersReducer: MembersState;
}
/***************************************************** */
//    Lets see an example of component:
//    constructor(private slideStore: Store<IStates>){}
//    ...
//    ...
//    this.store.dispatch( //action from slidesReducer// )
//    this.Store.select('slidesReducer').subscribe...
//
/***************************************************** */



/* export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : []; */
