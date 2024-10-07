import { createReducer, on } from '@ngrx/store';
import { CartState } from './cart.state';
import { addToCart, incrementQuantity, decrementQuantity, removeFromCart } from './cart.actions';

const initialState: CartState = {
	items: [],
};

export const cartReducer = createReducer(
	initialState,
	on(addToCart, (state, { product, quantity }) => {
		const cartItem = state.items.find((item) => item.product.id === product.id);
		if (cartItem) {
			// If the product is already in the cart, update the quantity
			return {
				...state,
				items: state.items.map((item) =>
					item.product.id === product.id
						? { ...item, quantity: item.quantity + quantity }
						: item
				),
			};
		} else {
			// If it's a new product, add it to the cart
			return {
				...state,
				items: [...state.items, { product, quantity }],
			};
		}
	}),
	on(incrementQuantity, (state, { productId }) => {
		return {
			...state,
			items: state.items.map((item) =>
				item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
			),
		};
	}),
	on(decrementQuantity, (state, { productId }) => {
		const cartItem = state.items.find((item) => item.product.id === productId);
		if (cartItem && cartItem.quantity > 1) {
			return {
				...state,
				items: state.items.map((item) =>
					item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
				),
			};
		} else {
			return {
				...state,
				items: state.items.filter((item) => item.product.id !== productId), // Remove if quantity is 0
			};
		}
	}),
	on(removeFromCart, (state, { productId }) => {
		return {
			...state,
			items: state.items.filter((item) => item.product.id !== productId),
		};
	})
);
