import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/products.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';

@Component({
	selector: 'app-product-list',
	standalone: true,
	imports: [CommonModule, MatCardModule, MatButtonModule],
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
	public products: Product[] = [];

	constructor(
		private productService: ProductService,
		private router: Router,
		private cartService: CartService
	) {
		this.products = this.productService.getProducts();
	}

	public viewProductDetails(productId: number) {
		this.router.navigate(['/product', productId]);
	}

	public addToCart(product: Product) {
		this.cartService.addToCart(product, 1);
		alert(`${product.name} added to the cart`);
	}
}
