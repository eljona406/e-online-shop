import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/models/product.model';

export const loadProducts = createAction('[Product List] Load Products');

export const loadProductsSuccess = createAction(
	'[Product List] Load Products Success',
	props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
	'[Product List] Load Products Failure',
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	props<{ error: any }>()
);
