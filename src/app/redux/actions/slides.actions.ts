import { createAction, props } from "@ngrx/store"
import { Slide } from '../../models/slides';


export const loadSlides = createAction('[SLIDES List/API] Store slides')
export const loadSlidesSuccess = createAction('[SLIDES List/API] Store slides SUCCESS', props<{ slides: Slide[] }>())
export const loadSlidesError = createAction('[SLIDES List/API] Store slides ERROR', props<{ error: any }>())

export const loadSlide = createAction('[SLIDE/API] Store slide', props<{ id: number }>())
export const loadSlideSuccess = createAction('[SLIDE/API] Store slide SUCCESS', props<{ slide: Slide }>())
export const loadSlideError = createAction('[SLIDE/API] Store slide ERROR', props<{ error: any }>())

export const addSlide = createAction('[SLIDE/API] Post slide', props<{ slide: Slide }>())
export const addSlideSuccess = createAction('[SLIDE/API] Post slide SUCCESS', props<{ slide: Slide }>())
export const addSlideError = createAction('[SLIDE/API] Post slide ERROR', props<{ error: any }>())

export const updateSlide = createAction('[SLIDE/API] Update slide', props<{ slide: Slide }>())
export const updateSlideSuccess = createAction('[SLIDE/API] Update slide SUCCESS', props<{ slide: Slide }>())
export const updateSlideError = createAction('[SLIDE/API] Update slide ERROR', props<{ error: any }>())

export const removeSlide = createAction('[SLIDE/API] Remove slide', props<{ id: number }>())
export const removeSlideSuccess = createAction('[SLIDE/API] Remove slide SUCCESS', props<{ slide: Slide }>())
export const removeSlideError = createAction('[SLIDE/API] Remove slide ERROR', props<{ error: any }>())
