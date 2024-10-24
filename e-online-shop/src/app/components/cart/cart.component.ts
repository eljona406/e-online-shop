import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
} from '../../core/store/cart/cart.actions';
import { selectCartItems } from '../../core/store/cart/cart.selectors';
import { CartState } from '../../core/store/cart/cart.state';
import { setHeaderVisibility } from '../../core/store/ui/ui.actions';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Product } from '../../shared/models/product.model';
import { MatStepperModule } from '@angular/material/stepper';
import { CartItem } from '../../shared/models/cart.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-cart',
	standalone: true,
	imports: [
		CommonModule,
		HeaderComponent,
		MatStepperModule,
		MatInputModule,
		MatButtonModule,
		ReactiveFormsModule,
	],
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
	cartItems$: Observable<CartItem[]> | undefined;
	isLinear = false;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;

	constructor(
		private store: Store<{ cart: CartState }>,
		private _formBuilder: FormBuilder,
		private router: Router
	) {
		this.firstFormGroup = this._formBuilder.group({
			firstCtrl: ['', Validators.required],
		});
		this.secondFormGroup = this._formBuilder.group({
			cardNumber: ['', Validators.required],
			expirationDate: ['', Validators.required],
			cvv: ['', Validators.required],
		});
	}

	ngOnInit(): void {
		this.cartItems$ = this.store.select(selectCartItems);
		this.store.dispatch(setHeaderVisibility({ isHeaderVisible: true }));
	}

	public increaseQuantity(productId: number) {
		this.store.dispatch(incrementQuantity({ productId }));
	}

	public decreaseQuantity(productId: number) {
		this.store.dispatch(decrementQuantity({ productId }));
	}

	public removeFromCart(productId: number) {
		this.store.dispatch(removeFromCart({ productId }));
	}

	public getTotalAmount(cartItems: { product: Product; quantity: number }[]): number {
		return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
	}

	public navigateToProducts() {
		this.router.navigate(['/products/all-products']);
	}
}
