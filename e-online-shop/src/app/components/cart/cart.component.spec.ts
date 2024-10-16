import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('CartComponent', () => {
	let component: CartComponent;
	let fixture: ComponentFixture<CartComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CartComponent],
			providers: [
				provideMockStore(),
				{
					provide: ActivatedRoute,
					useValue: {
					  paramMap: of(new Map([['category', 'all-products']])),
					},
				  },
			]
		}).compileComponents();

		fixture = TestBed.createComponent(CartComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
