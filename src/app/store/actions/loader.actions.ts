import { createAction } from '@ngrx/store';

export const setLoader = createAction('[Loader] Set');
export const showLoader = createAction('[Loader] Show');
export const hideLoader = createAction('[Loader] Hide');
