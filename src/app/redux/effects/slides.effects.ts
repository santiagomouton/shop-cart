import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import { SlidesService } from "../../services/controllers/slides.service";
import * as slidesActions from "../actions/slides.actions";

@Injectable()
export class SlidesEffects {


  loadSlides$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(slidesActions.loadSlides),
      switchMap(() => {
        return this.slidesService.getSlides().pipe(
          map((slides) => slidesActions.loadSlidesSuccess( {slides} )),
          catchError((error) => of( slidesActions.loadSlidesError({error}) ))
        );
      })
    );
  });

  loadSlide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(slidesActions.loadSlide),
      switchMap((action) => {
        return this.slidesService.getSlideById(action.id).pipe(
          map((slide) => slidesActions.loadSlideSuccess( {slide} )),
          catchError((error) => of( slidesActions.loadSlideError({error}) ))
        );
      })
    );
  });

  postSlide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(slidesActions.addSlide),
      switchMap((action) => {
        return this.slidesService.postSlide(action.slide).pipe(
          map((slide) => slidesActions.addSlideSuccess( {slide} )),
          catchError((error) => of( slidesActions.addSlideError({error}) ))
        );
      })
    );
  });

  updateSlide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(slidesActions.updateSlide),
      switchMap((action) => {
        return this.slidesService.updateSlide(action.slide).pipe(
          map((slide) => slidesActions.updateSlideSuccess( {slide} )),
          catchError((error) => of( slidesActions.updateSlideError({error}) ))
        );
      })
    );
  });

  removeSlide$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(slidesActions.removeSlide),
      switchMap((action) => {
        return this.slidesService.deleteSlide(action.id).pipe(
          map((slide) => slidesActions.removeSlideSuccess( {slide} )),
          catchError((error) => of( slidesActions.removeSlideError({error}) ))
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private slidesService: SlidesService
  ) {}
}
