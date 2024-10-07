import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
	selectCartState,
	(state: CartState) => state.items // Return the array of CartItem
);

export const selectCartCount = createSelector(
	selectCartItems,
	(items) => items.reduce((total, item) => total + item.quantity, 0) // Sum the quantity of each item
);
