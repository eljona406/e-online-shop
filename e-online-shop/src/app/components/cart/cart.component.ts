import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { selectCartItems } from '../../core/store/cart/cart.selectors';
import {
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
} from '../../core/store/cart/cart.actions';
import { CartState } from '../../core/store/cart/cart.state';
import { setHeaderVisibility } from '../../core/store/ui/ui.actions';

@Component({
	selector: 'app-cart',
	standalone: true,
	imports: [CommonModule, HeaderComponent],
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
	cartItems$: Observable<{ product: Product; quantity: number }[]> | undefined;

	constructor(private store: Store<{ cart: CartState }>) {}

	ngOnInit(): void {
		this.cartItems$ = this.store.select(selectCartItems);
		this.store.dispatch(setHeaderVisibility({ isHeaderVisible: true }));
	}

	public increaseQuantity(productId: number) {
		this.store.dispatch(incrementQuantity({ productId })); // Dispatch the increment action
	}

	public decreaseQuantity(productId: number) {
		this.store.dispatch(decrementQuantity({ productId })); // Dispatch the decrement action
	}

	public removeFromCart(productId: number) {
		this.store.dispatch(removeFromCart({ productId })); // Dispatch the remove action
	}
}
