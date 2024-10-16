import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/models/product.model';
import { selectProducts } from '../../core/store/products/products.selectors';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardComponent', () => {
	let component: DashboardComponent;
	let fixture: ComponentFixture<DashboardComponent>;
	let mockStore: MockStore;
	let router: Router;

	const mockProducts: Product[] = [
		{
			id: 1,
			name: 'Product 1',
			description: 'Description 1',
			price: 100,
			category: 'Fantasy',
			author: 'Author 1',
			rating: 4.5,
			isInStock: true,
			quantity: 10,
			images: [],
		},
		{
			id: 2,
			name: 'Product 2',
			description: 'Description 2',
			price: 200,
			category: 'Romance',
			author: 'Author 2',
			rating: 4.0,
			isInStock: true,
			quantity: 5,
			images: [],
		},
	];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				CommonModule,
				DashboardComponent,
				HeaderComponent,
				MenuComponent,
				CarouselComponent,
				BrowserAnimationsModule,
			],
			providers: [
				provideMockStore(),
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: { paramMap: { get: () => 4 } }, // Mocking ActivatedRoute snapshot
					},
				},
			],
		}).compileComponents();

		mockStore = TestBed.inject(MockStore);
		fixture = TestBed.createComponent(DashboardComponent);
		component = fixture.componentInstance;

		// Set up the selector to return mock products
		mockStore.overrideSelector(selectProducts, mockProducts);
		router = TestBed.inject(Router);
		spyOn(router, 'navigate');
		fixture.detectChanges();
	});

	it('should create the DashboardComponent', () => {
		expect(component).toBeTruthy();
	});

	it('should select products from the store', () => {
		component.products.subscribe((products) => {
			expect(products).toEqual(mockProducts);
		});
	});

	it('should navigate to product details on handleItemClick', () => {
		const productId = 1;
		component.handleItemClick(productId);
		expect(router.navigate).toHaveBeenCalledWith(['/product', productId]);
	});
});
