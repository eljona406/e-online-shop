import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/products.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
	selector: 'app-product-detail',
	standalone: true,
	imports: [],
	templateUrl: './product-detail.component.html',
	styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
	public productId: number | null | undefined;
	public product: Product | undefined;

	constructor(
		private route: ActivatedRoute,
		private productService: ProductService,
		private cartService: CartService,
	) {}

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');

		// If the id exists, convert it to a number. Otherwise, set productId to null.
		this.productId = id !== null ? +id : null;

		if (this.productId !== null) {
			this.loadProductDetails(this.productId);
		} else {
			console.error('Product ID is not valid');
		}
	}

	public loadProductDetails(id: number) {
		this.product = this.productService.getProducts().find((p) => p.id === id);

		if (!this.product) {
			console.error('Product not found');
		}
	}

	public addToCart() {
		if (this.product) {
			this.cartService.addToCart(this.product, 1);
			alert(`${this.product.name} added to the cart`);
		}
	}
}
