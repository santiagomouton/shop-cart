import { createReducer, on } from "@ngrx/store";
import * as sidenavActions from "../actions/sidenav.action";

export interface SidenavState {
    open: boolean;
}

const initialState: SidenavState = {
    open: false
}

const _sidenavReducer = createReducer(
    initialState,
    on(sidenavActions.sidenavToggle, (state, action) => ({ open: !state.open }))
);
    
export function sidenavReducer(state: SidenavState, action: any) {
    return _sidenavReducer(state, action);
}