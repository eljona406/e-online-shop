import { Product } from '../../shared/models/product.model';

export interface CartItem {
	product: Product;
	quantity: number;
}

export interface CartState {
	items: CartItem[];
}
export interface initialCardState {
	cart: CartState;
}
