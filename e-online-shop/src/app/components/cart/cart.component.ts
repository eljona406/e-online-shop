import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
	selector: 'app-cart',
	standalone: true,
	imports: [CommonModule, HeaderComponent],
	templateUrl: './cart.component.html',
	styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
	cartItems: { product: Product; quantity: number }[] = [];

	constructor(private cartService: CartService) {}

	ngOnInit(): void {
		this.cartItems = this.cartService.getCartItems();
	}

	public increaseQuantity(productId: number) {
		this.cartService.incrementQuantity(productId);
		this.cartItems = this.cartService.getCartItems();
	}

	public decreaseQuantity(productId: number) {
		this.cartService.decrementQuantity(productId);
		this.cartItems = this.cartService.getCartItems();
	}

	public removeFromCart(productId: number) {
		this.cartService.removeFromCart(productId);
		this.cartItems = this.cartService.getCartItems(); // Refresh the cart items
	}
}
