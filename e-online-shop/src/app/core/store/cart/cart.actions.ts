import { createAction, props } from '@ngrx/store';
import { Product } from '../../../shared/models/product.model';

export const addToCart = createAction(
	'[Cart] Add to Cart',
	props<{ product: Product; quantity: number }>()
);
export const incrementQuantity = createAction(
	'[Cart] Increment Quantity',
	props<{ productId: number }>()
);
export const decrementQuantity = createAction(
	'[Cart] Decrement Quantity',
	props<{ productId: number }>()
);
export const removeFromCart = createAction(
	'[Cart] Remove from Cart',
	props<{ productId: number }>()
);
export const clearCart = createAction('[Cart] Clear Cart');
