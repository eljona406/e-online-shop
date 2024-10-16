import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.reducer';
import { Product } from '../../../shared/models/product.model';

export const selectProductsState = createFeatureSelector<ProductsState>('product');


export const selectProducts = createSelector(
	selectProductsState,
	(state: ProductsState): Product[] => state.products || []
  );
