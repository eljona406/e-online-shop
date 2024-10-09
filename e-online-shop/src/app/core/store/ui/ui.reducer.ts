import { createReducer, on } from '@ngrx/store';
import { setMenuVisibility, setHeaderVisibility } from './ui.actions';
import { UIState } from './ui.state';

const initialState: UIState = {
	isMenuVisible: true,
	isHeaderVisible: false,
	isLoading: false,
};

export const uiReducer = createReducer(
	initialState,
	on(setMenuVisibility, (state, { isVisible }) => ({
		...state,
		isMenuVisible: isVisible,
	})),
	on(setHeaderVisibility, (state, { isVisible }) => ({
		...state,
		isHeaderVisible: isVisible,
	}))
);
