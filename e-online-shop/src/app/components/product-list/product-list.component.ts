import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class ProductListComponent implements OnInit, OnDestroy {
	public products$: Observable<Product[]>;
	public searchTerm = '';
	public filteredProducts: Product[] = [];
	public allProducts: Product[] = [];
	public selectedCategory: string | undefined;
	private unsubscribe$ = new Subject<void>(); // Subject for unsubscription

	constructor(
		public router: Router,
		public store: Store,
		public route: ActivatedRoute
	) {
		// Select products from the store
		this.products$ = this.store.select(selectProducts);
		this.store.dispatch(setHeaderVisibility({ isHeaderVisible: true }));
	}

	ngOnInit() {
		this.loadProducts(); // Dispatch action to load products

		// Subscribe to products$ to initialize filteredProducts with takeUntil
		this.products$.pipe(takeUntil(this.unsubscribe$)).subscribe((products) => {
			this.filteredProducts = products;
			this.allProducts = products;
		});

		this.route.paramMap.subscribe((params) => {
			const category = params.get('category');
			if (category) {
				this.setCategory(category);
			} else {
				this.setCategory('all-products'); // Default category if none is provided
			}
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
			this.products$.pipe(takeUntil(this.unsubscribe$)).subscribe((products) => {
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
			this.products$.pipe(takeUntil(this.unsubscribe$)).subscribe((products) => {
				this.filteredProducts = products; // Reset to all products if search term is empty
			});
		}
	}

	public setCategory(category: string): void {
		this.selectedCategory = category;
		this.filterByCategory(this.selectedCategory);
	}

	public filterByCategory(category: string | null): void {
		if (category === 'all-products' || !category) {
			this.filteredProducts = this.allProducts; // Show all products
		} else {
			this.filteredProducts = this.allProducts.filter(
				(product) => product.category.toLowerCase() === category.toLowerCase()
			); // Filter by selected category
		}
	}

	public onKeydown(event: KeyboardEvent, productId: number): void {
		if (event.key === 'Enter' || event.key === ' ') {
			this.viewProductDetails(productId);
		}
	}

	ngOnDestroy() {
		this.unsubscribe$.next(); // Emit a value to complete all subscriptions
		this.unsubscribe$.complete(); // Clean up
	}
}
