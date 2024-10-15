import {
	Component,
	Input,
	OnInit,
	OnDestroy,
	Inject,
	PLATFORM_ID,
	EventEmitter,
	Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../models/product.model';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
	selector: 'app-carousel',
	standalone: true,
	imports: [CommonModule, CarouselModule],
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit, OnDestroy {
	@Input() products: Observable<Product[]> | undefined;
	@Input() category = '';
	@Output() itemClick = new EventEmitter<number>();

	public filteredProducts: Product[] = [];
	public currentImageIndex = 0;
	public imagesToShow = 6;
	public productSubscription!: Subscription;
	public startX = 0;
	public endX = 0;

	customOptions: OwlOptions = {
		loop: false,
		margin: 10,
		dots: true,
		nav: true,
		responsive: {
			0: { items: 1 },
			600: { items: 3 },
			1000: { items: 6 },
		},
		touchDrag: true,
		mouseDrag: true,
		autoWidth: false,
		center: false,
	};

	get totalGroups(): number {
		return Math.ceil(this.filteredProducts.length / this.imagesToShow);
	}

	public get displayedProducts() {
		const numberOfProducts = this.filteredProducts.length;

		if (numberOfProducts <= this.imagesToShow) {
			return this.filteredProducts;
		}

		const startIndex = this.currentImageIndex * this.imagesToShow;
		const endIndex = Math.min(startIndex + this.imagesToShow, numberOfProducts);
		return this.filteredProducts.slice(startIndex, endIndex);
	}

	constructor(@Inject(PLATFORM_ID) private platformId: object) {}

	public ngOnInit() {
		if (this.products) {
			this.productSubscription = this.products.subscribe((products) => {
				if (this.category) {
					this.filteredProducts = products.filter(
						(product) => product.category === this.category
					);
				} else {
					this.filteredProducts = products;
				}
			});
		}
	}

	public ngOnDestroy() {
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

	public handleSwipe() {
		const swipeThreshold = 50;
		if (this.startX - this.endX > swipeThreshold) {
			this.nextImageGroup();
		} else if (this.endX - this.startX > swipeThreshold) {
			this.prevImageGroup();
		}
	}

	public nextImageGroup() {
		if (this.currentImageIndex < this.totalGroups - 1) {
			this.currentImageIndex++;
		} else {
			this.currentImageIndex = this.totalGroups - 1; // Prevent going out of bounds
		}
	}

	public prevImageGroup() {
		if (this.currentImageIndex > 0) {
			this.currentImageIndex--;
		} else {
			this.currentImageIndex = 0; // Prevent going out of bounds
		}
	}

	public goToGroup(index: number) {
		this.currentImageIndex = index;
	}

	public onItemClick(productId: number) {
		this.itemClick.emit(productId);
	}

	public onKeydown(event: KeyboardEvent, productId: number): void {
		if (event.key === 'Enter' || event.key === ' ') {
			this.onItemClick(productId);
		}
	}
}
