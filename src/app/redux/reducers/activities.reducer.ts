import { createReducer, on } from "@ngrx/store";
import { IActivity } from "src/app/models/activity";
import * as activityActions from "../actions/activities.action";

export interface ActivityState {
    activities: IActivity[];
    loading: boolean;
    error: any;
}

const initialState: ActivityState = {
    activities: [],
    loading: true,
    error: null
}

const _activitiesReducer = createReducer(
    initialState,
    on(activityActions.loadActivities, (state, action) => ({ loading: true})),
    on(activityActions.loadActivitiesSuccess, (state, action) => ({
        activities: [...action.activities],
        loading: false,
    })),
    on(activityActions.loadActivitiesError, (state, action) => ({
        loading: false,
        error: {
            status: action.error.status,
            message: action.error.message,
            url: action.error.url,
        },
    })),
    on(activityActions.loadActivity, (state, action) => ({ loading: true})),
    on(activityActions.loadActivitySuccess, (state, action) => ({
        activities:[action.activity],
        loading:false,
    })),
    on(activityActions.loadActivityError, (state, action) =>({
        loading: false,
        error: {
            status: action.error.status,
            message: action.error.message,
            url: action.error.url,
        }
    })),
    on(activityActions.addActivity, (state, action) => ({
        loading:true,
    })),
    on(activityActions.addActivitySuccess, (state, action) => ({
        activities: [action.activity],
        loading: true,
    })),
    on(activityActions.addActivityError, (state, action) => ({
        loading: false,
        error: {
            status: action.error.status,
            message: action.error.message,
            url: action.error.url,
        }
    })),
    on(activityActions.uploadActivity, (state, action) => ({
        loading: true,
    })),
    on(activityActions.uploadActivitySuccess, (state, action) => ({
        activities: [action.activity],
        loading: true,
    })),
    on(activityActions.uploadActivityError, (state, action) => ({
        loading:false,
        error: {
            status: action.error.status,
            message: action.error.message,
            url: action.error.url,
        }
    })),
    on(activityActions.removeActivity, (state, action) => ({
        loading: true
    })),
    on(activityActions.removeActivitySuccess, (state, action) => ({
        activities: [action.activity],
        loading: true,
    })),
    on(activityActions.removeActivityError, (state, action) => ({
        loading: false,
        error: {
            status: action.error.status,
            message: action.error.message,
            url: action.error.url,
        }
    }) )
);

export function activityReducer(state: ActivityState, action: any) {
    return _activitiesReducer(state, action);
}