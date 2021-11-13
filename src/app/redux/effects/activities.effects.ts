import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import { ActivitiesService } from "../../services/controllers/activities.service";
import * as activitiesActions from "../actions/activities.action";

@Injectable()
export class ActivitiesEffects {
    
    loadActivities$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(activitiesActions.loadActivities),
            switchMap(() => {
                return this.activityService.getActivities().pipe(
                    map((activities) => activitiesActions.loadActivitiesSuccess({activities})),
                    catchError((error) => of (activitiesActions.loadActivitiesError({error})))
                )
            })
        )
    })

    loadActivity$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(activitiesActions.loadActivity),
            switchMap((action) => {
                return this.activityService.getActivityByid(action.id).pipe(
                    map((activity) => activitiesActions.loadActivitySuccess({activity})),
                    catchError((error) => of (activitiesActions.loadActivityError({error})))
                )
            })
        ) 
    })

    createActivity$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(activitiesActions.addActivity),
            switchMap((action) => {
                return this.activityService.postActivity(action.activity).pipe(
                    map((activity) => activitiesActions.addActivitySuccess({activity})),
                    catchError((error) => of (activitiesActions.addActivityError({error})))
                )
            })
        ) 
    })

    updateActivity$ = createEffect(() => {
            return this.actions$.pipe(
                ofType(activitiesActions.uploadActivity),
                switchMap((action) => {
                    return this.activityService.postActivity(action.activity).pipe(
                        map((activity) => activitiesActions.uploadActivitySuccess({activity})),
                        catchError((error) => of (activitiesActions.uploadActivityError({error})))
                    )
                })
            ) 
    })

    removeActivity$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(activitiesActions.removeActivity),
            switchMap((action) => {
                return this.activityService.deleteActivity(action.id).pipe(
                    map((activity) => activitiesActions.removeActivitySuccess({activity})),
                    catchError((error) => of (activitiesActions.removeActivityError({error})))
                )
            })
        ) 
    })

    constructor( private actions$: Actions, private activityService: ActivitiesService){}
}