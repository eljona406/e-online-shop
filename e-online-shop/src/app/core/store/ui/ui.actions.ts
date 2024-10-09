import { createAction, props } from '@ngrx/store';

export const setMenuVisibility = createAction(
	'[UI] Set Menu Visibility',
	props<{ isMenuVisible: boolean }>()
);
export const setHeaderVisibility = createAction(
	'[UI] Set Header Visibility',
	props<{ isHeaderVisible: boolean }>()
);
