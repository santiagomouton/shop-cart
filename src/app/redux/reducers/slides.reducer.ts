import { createReducer, on } from "@ngrx/store";
import * as slideActions from "../actions/slides.actions";
import { Slide } from "../../models/slides";

export interface SlidesState {
  slides: Slide[];
  loading: boolean;
  error: any;
}

const initialState: SlidesState = {
  slides: [],
  loading: true,
  error: null,
};

// Function that returns the state depens on the action param
const _slidesReducer = createReducer(
  initialState,
  on(slideActions.loadSlides, (state, action) => ({ loading: true })),
  on(slideActions.loadSlidesSuccess, (state, action) => ({
    slides: [...action.slides],
    loading: false,
  })),
  on(slideActions.loadSlidesError, (state, action) => ({
    loading: false,
    error: {
      status: action.error.status,
      message: action.error.message,
      url: action.error.url,
    },
  })),
  on(slideActions.loadSlide, (state, action) => ({ loading: true })),
  on(slideActions.loadSlideSuccess, (state, action) => ({
    slides: [action.slide],
    loading: false,
  })),
  on(slideActions.loadSlideError, (state, action) => ({
    loading: false,
    error: {
      status: action.error.status,
      message: action.error.message,
      url: action.error.url,
    },
  })),
  on(slideActions.addSlide, (state, action) => ({
    loading: true,
  })),
  on(slideActions.addSlideSuccess, (state, action) => ({
    slides: [action.slide],
    loading: true,
  })),
  on(slideActions.addSlideError, (state, action) => ({
    loading: true,
    error: {
      status: action.error.status,
      message: action.error.message,
      url: action.error.url,
    },
  })),
  on(slideActions.updateSlide, (state, action) => ({
    loading: true,
  })),
  on(slideActions.updateSlideSuccess, (state, action) => ({
    slides: [action.slide],
    loading: true,
  })),
  on(slideActions.updateSlideError, (state, action) => ({
    loading: true,
    error: {
      status: action.error.status,
      message: action.error.message,
      url: action.error.url,
    },
  })),
  on(slideActions.removeSlide, (state, action) => ({
    loading: true,
  })),
  on(slideActions.removeSlideSuccess, (state, action) => ({
    slides: [action.slide],
    loading: true,
  })),
  on(slideActions.removeSlideError, (state, action) => ({
    loading: true,
    error: {
      status: action.error.status,
      message: action.error.message,
      url: action.error.url,
    },
  }))
);

export function slidesReducer(state: SlidesState, action: any) {
  return _slidesReducer(state, action);
}
