import { createReducer, on } from '@ngrx/store';
import { setMenuVisibility, setHeaderVisibility } from './ui.actions';
import { UIState } from './ui.state';

const initialState: UIState = {
	isMenuVisible: true,
	isHeaderVisible: true,
	isLoading: false,
};

export const uiReducer = createReducer(
	initialState,
	on(setMenuVisibility, (state, { isMenuVisible }) => ({
		...state,
		isMenuVisible: isMenuVisible,
	})),
	on(setHeaderVisibility, (state, { isHeaderVisible }) => ({
		...state,
		isHeaderVisible: isHeaderVisible,
	}))
);
