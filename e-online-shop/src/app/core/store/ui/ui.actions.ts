import { createAction, props } from '@ngrx/store';

export const setMenuVisibility = createAction(
	'[UI] Set Menu Visibility',
	props<{ isVisible: boolean }>()
);
export const setHeaderVisibility = createAction(
	'[UI] Set Header Visibility',
	props<{ isVisible: boolean }>()
);
