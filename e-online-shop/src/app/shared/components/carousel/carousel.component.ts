import { Component, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../models/product.model';

@Component({
	selector: 'app-carousel',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit, OnDestroy {
	@Input() products: Observable<Product[]> | undefined;
	@Input() category = '';
	public filteredProducts: Product[] = [];
	public currentImageIndex = 0;
	public intervalId!: number;
	public imagesToShow = 6;
	public productSubscription!: Subscription;
	public startX = 0;
	public endX = 0;

	public get displayedProducts() {
		const numberOfProducts = this.filteredProducts.length;

		// If there are fewer products than `imagesToShow`, return all of them
		if (numberOfProducts <= this.imagesToShow) {
			return this.filteredProducts;
		}

		// Handle circular view
		const endIndex = this.currentImageIndex + this.imagesToShow;

		if (endIndex <= numberOfProducts) {
			// Normal case, no wrapping required
			return this.filteredProducts.slice(this.currentImageIndex, endIndex);
		} else {
			// Wrapping case: take products from the end and beginning
			const part1 = this.filteredProducts.slice(this.currentImageIndex, numberOfProducts);
			const part2 = this.filteredProducts.slice(0, endIndex % numberOfProducts);
			return [...part1, ...part2]; // Combine both slices
		}
	}

	constructor(@Inject(PLATFORM_ID) private platformId: object) {}

	public ngOnInit() {
		if (this.products) {
			this.productSubscription = this.products.subscribe((products) => {
				// Filter by category if provided
				if (this.category) {
					this.filteredProducts = products.filter(
						(product) => product.category === this.category
					);
				} else {
					this.filteredProducts = products;
				}

				if (isPlatformBrowser(this.platformId)) {
					this.startAutoScroll(); // Start auto-scroll only in the browser
				}
			});
		}
	}

	public startAutoScroll() {
		this.intervalId = window.setInterval(() => {
			this.currentImageIndex = (this.currentImageIndex + 1) % this.filteredProducts.length;
		}, 3000);
	}

	// Clean up the interval and subscription
	public ngOnDestroy() {
		clearInterval(this.intervalId);
		if (this.productSubscription) {
			this.productSubscription.unsubscribe();
		}
	}

	public onTouchStart(event: TouchEvent) {
		this.startX = event.touches[0].clientX;
	}

	public onTouchEnd(event: TouchEvent) {
		this.endX = event.changedTouches[0].clientX;
		this.handleSwipe();
	}

	public nextImage() {
		this.currentImageIndex = (this.currentImageIndex + 1) % this.filteredProducts.length;
	}

	public prevImage() {
		this.currentImageIndex =
			(this.currentImageIndex - 1 + this.filteredProducts.length) %
			this.filteredProducts.length;
	}

	public handleSwipe() {
		const swipeThreshold = 50;
		if (this.startX - this.endX > swipeThreshold) {
			this.nextImage();
		} else if (this.endX - this.startX > swipeThreshold) {
			this.prevImage();
		}
	}
}
