import { Product } from '../../shared/models/product.model';

// Define the shape of the products state
export interface ProductsState {
	products: Product[];
	loading: boolean;
	error: string | null;
}

// Define the initial state
export const initialProductsState: ProductsState = {
	products: [],
	loading: false,
	error: null,
};
