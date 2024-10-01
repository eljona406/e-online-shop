import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../shared/services/products.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SearchComponent } from '../../shared/components/search/search.component';

@Component({
	selector: 'app-product-list',
	standalone: true,
	imports: [CommonModule, MatCardModule, MatButtonModule, HeaderComponent, SearchComponent],
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
	public products: Product[] = [];
	public searchTerm = '';
	public filteredProducts: Product[] = [];

	constructor(
		private productService: ProductService,
		private router: Router,
		private cartService: CartService
	) {
		this.products = this.productService.getProducts();
		this.filteredProducts = this.products; // Initialize with all products
	}

	public viewProductDetails(productId: number) {
		this.router.navigate(['/product', productId]);
	}

	public addToCart(product: Product) {
		this.cartService.addToCart(product);
		alert(`${product.name} added to the cart`);
	}

	public filterProducts(searchTerm: string): void {
		if (searchTerm) {
			console.log(searchTerm);
			const lowerCaseTerm = searchTerm.toLowerCase();

			this.filteredProducts = this.products.filter(
				(product) =>
					product.name.toLowerCase().includes(lowerCaseTerm) ||
					product.description.toLowerCase().includes(lowerCaseTerm) ||
					product.price.toString().includes(lowerCaseTerm)
			);
		} else {
			this.filteredProducts = this.products;
		}
	}
}
