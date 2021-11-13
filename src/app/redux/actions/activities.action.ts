import { createAction, props } from "@ngrx/store";
import { IActivity } from '../../models/activity'


export const loadActivities = createAction('[Activity List/API] Store Activity')
export const loadActivitiesSuccess = createAction('[Activity List/API] Store Activity SUCCESS', props<{ activities: IActivity[] }>());
export const loadActivitiesError = createAction('[Activity List/API] Store Activity ERROR', props<{ error: any }>());

export const loadActivity = createAction('[Activity API] Store Activity', props<{ id: number}>())
export const loadActivitySuccess = createAction('[Activity API] Store Activity SUCCESS', props<{activity: IActivity}>())
export const loadActivityError = createAction('[Activity API] Store Activity ERROR', props<{error: any}>())

export const addActivity = createAction('[Activity API] Add Activity', props<{ activity: IActivity}>())
export const addActivitySuccess = createAction('[Activity API] Add Activity SUCCESS', props<{activity: IActivity}>())
export const addActivityError = createAction('[Activity API] Add Activity ERROR', props<{error: any}>())

export const uploadActivity = createAction('[Activity API] Update Activity', props<{ activity: IActivity}>())
export const uploadActivitySuccess = createAction('[Activity API] Update Activity SUCCESS', props<{activity: IActivity}>())
export const uploadActivityError = createAction('[Activity API] Update Activity ERROR', props<{error: any}>())

export const removeActivity = createAction('[Activity API] Remove Activity', props<{ id: number}>())
export const removeActivitySuccess = createAction('[Activity API] Remove Activity SUCCESS', props<{activity: IActivity}>())
export const removeActivityError = createAction('[Activity API] Remove Activity ERROR', props<{error: any}>())