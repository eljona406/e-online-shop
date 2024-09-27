import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	private cart: { product: Product; quantity: number }[] = [];
	private cartCount = new BehaviorSubject<number>(0); // Cart count as observable

	cartCount$ = this.cartCount.asObservable(); // Expose cart count as observable

	constructor() {
		this.loadCart();
		this.updateCartCount(); // Initialize the cart count
	}

	public addToCart(product: Product, quantity = 1) {
		const cartItem = this.cart.find((item) => item.product.id === product.id);
		if (cartItem) {
			cartItem.quantity += quantity;
		} else {
			this.cart.push({ product, quantity });
		}
		this.saveCart();
		this.updateCartCount();
	}

	// Increment product quantity
	public incrementQuantity(productId: number) {
		const cartItem = this.cart.find((item) => item.product.id === productId);
		if (cartItem) {
			cartItem.quantity += 1;
			this.saveCart();
			this.updateCartCount();
		}
	}

	// Decrement product quantity
	public decrementQuantity(productId: number) {
		const cartItem = this.cart.find((item) => item.product.id === productId);
		if (cartItem) {
			cartItem.quantity -= 1;
			if (cartItem.quantity === 0) {
				this.removeFromCart(productId); // Remove item if quantity is 0
			} else {
				this.saveCart();
				this.updateCartCount();
			}
		}
	}

	// Remove product from cart
	public removeFromCart(productId: number) {
		this.cart = this.cart.filter((item) => item.product.id !== productId);
		this.saveCart();
		this.updateCartCount(); // Update cart count after removing product
	}

	public getCartItems() {
		return this.cart;
	}

	public clearCart() {
		this.cart = [];
		this.saveCart();
		this.updateCartCount(); // Update cart count after clearing cart
	}

	private updateCartCount() {
		const totalCount = this.cart.reduce((acc, item) => acc + item.quantity, 0);
		this.cartCount.next(totalCount); // Update the cart count observable
	}

	private loadCart() {
		if (this.isLocalStorageAvailable()) {
			const savedCart = localStorage.getItem('cart');
			this.cart = savedCart ? JSON.parse(savedCart) : [];
		}
	}

	private saveCart() {
		if (this.isLocalStorageAvailable()) {
			localStorage.setItem('cart', JSON.stringify(this.cart));
		}
	}

	//Check if the browser supports and allows access to localStorage
	private isLocalStorageAvailable(): boolean {
		try {
			const test = '__test__';
			localStorage.setItem(test, test);
			localStorage.removeItem(test);
			return true;
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			return false;
		}
	}
}
