import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UIState } from './ui.state';

export const selectUIState = createFeatureSelector<UIState>('ui');

export const selectIsMenuVisible = createSelector(
	selectUIState,
	(state: UIState) => state.isMenuVisible
);
export const selectIsHeaderVisible = createSelector(
	selectUIState,
	(state: UIState) => state.isHeaderVisible
);
