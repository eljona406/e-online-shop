import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { Store } from '@ngrx/store';
import { addToCart } from '../../core/store/cart/cart.actions';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { selectProducts } from '../../core/store/products/products.selectors';

@Component({
	selector: 'app-product-detail',
	standalone: true,
	imports: [HeaderComponent],
	templateUrl: './product-detail.component.html',
	styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
	public productId: number | null | undefined;
	public product: Product | undefined;
	public products$: Observable<Product[]>;

	constructor(
		private route: ActivatedRoute,
		private store: Store
	) {
		this.products$ = this.store.select(selectProducts);
	}

	ngOnInit() {
		const id = this.route.snapshot.paramMap.get('id');
		this.productId = id !== null ? +id : null;

		if (this.productId !== null) {
			this.loadProductDetails(this.productId);
		} else {
			console.error('Product ID is not valid');
		}
	}

	public loadProductDetails(id: number) {
		// Subscribe to products and find the product by ID
		this.products$
			.pipe(
				filter((products) => products.length > 0), // Only proceed if products exist
				first() // Complete the subscription after the first emission
			)
			.subscribe((products) => {
				this.product = products.find((p) => p.id === id);
				if (!this.product) {
					console.error('Product not found', id);
				}
			});
	}

	public addToCart() {
		if (this.product) {
			this.store.dispatch(addToCart({ product: this.product, quantity: 1 }));
			alert(`${this.product.name} added to the cart`);
		}
	}
}
