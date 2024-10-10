import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SearchComponent } from '../../shared/components/search/search.component';
import { selectProducts } from '../../core/store/products/products.selectors';
import { loadProducts } from '../../core/store/products/products.actions';
import { addToCart } from '../../core/store/cart/cart.actions';
import { setHeaderVisibility } from '../../core/store/ui/ui.actions';

@Component({
	selector: 'app-product-list',
	standalone: true,
	imports: [CommonModule, MatCardModule, MatButtonModule, HeaderComponent, SearchComponent],
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
	public products$: Observable<Product[]>;
	public searchTerm = '';
	public filteredProducts: Product[] = [];

	constructor(
		private router: Router,
		private store: Store
	) {
		// Select products from the store
		this.products$ = this.store.select(selectProducts);
		this.store.dispatch(setHeaderVisibility({ isHeaderVisible: true }));
	}

	ngOnInit() {
		this.loadProducts(); // Dispatch action to load products

		// Subscribe to products$ to initialize filteredProducts
		this.products$.subscribe((products) => {
			this.filteredProducts = products;
		});
	}

	private loadProducts() {
		this.store.dispatch(loadProducts());
	}

	public viewProductDetails(productId: number) {
		this.router.navigate(['/product', productId]);
	}

	public addToCart(product: Product) {
		this.store.dispatch(addToCart({ product, quantity: 1 }));
		alert(`${product.name} added to the cart`);
	}

	public filterProducts(searchTerm: string): void {
		if (searchTerm) {
			const lowerCaseTerm = searchTerm.toLowerCase();
			this.products$.subscribe((products) => {
				this.filteredProducts = products.filter(
					(product) =>
						product.name.toLowerCase().includes(lowerCaseTerm) ||
						product.description.toLowerCase().includes(lowerCaseTerm) ||
						product.price.toString().includes(lowerCaseTerm) ||
						product.category.toString().includes(lowerCaseTerm) ||
						product.author.toString().includes(lowerCaseTerm) ||
						product.rating.toString().includes(lowerCaseTerm)
				);
			});
		} else {
			this.products$.subscribe((products) => {
				this.filteredProducts = products; // Reset to all products if search term is empty
			});
		}
	}
	public onKeydown(event: KeyboardEvent, productId: number): void {
		if (event.key === 'Enter' || event.key === ' ') {
			this.viewProductDetails(productId);
		}
	}
}
