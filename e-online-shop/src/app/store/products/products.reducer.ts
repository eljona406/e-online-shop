import { createReducer, on } from '@ngrx/store';
import { loadProductsSuccess } from './products.actions';
import { Product } from '../../shared/models/product.model';

export interface ProductsState {
	products: Product[];
}

export const initialState: ProductsState = {
	products: [],
};

export const productReducer = createReducer(
	initialState,
	on(loadProductsSuccess, (state, { products }) => {
		return {
			...state,
			products: products,
		};
	})
);
