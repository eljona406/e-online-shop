import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';

export const selectProductsState = createFeatureSelector<ProductsState>('product');

export const selectProducts = createSelector(
	selectProductsState,
	(state: ProductsState) => state.products
);
