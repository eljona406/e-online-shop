/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectProducts } from '../../core/store/products/products.selectors';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let store: MockStore;
  const initialState = { products: [] }; // Mock the initial state

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (param: string) => '1' // Mocked route parameter
              }
            }
          }
        }
      ]
    }).compileComponents();

    store = TestBed.inject(Store) as MockStore;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;

    // Mock the selectProducts selector to return test data
    store.overrideSelector(selectProducts, [{
		id: 1,
		name: 'Test Product',
		description: 'A test product',
		price: 22,
		rating: 4.2,
		isInStock: true,
		quantity: 2,
		images: [],
		category: 'fantasy',
		author: 'Jane Austen',
	}
    ]);

    fixture.detectChanges(); // Trigger ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load product details based on productId', () => {
    component.ngOnInit();
    expect(component.productId).toBe(1);
    expect(component.product?.name).toBe('Test Product');
  });

  it('should call addToCart and dispatch the correct action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.product ={
		id: 1,
		name: 'Test Product',
		description: 'A test product',
		price: 22,
		rating: 4.2,
		isInStock: true,
		quantity: 2,
		images: [],
		category: 'fantasy',
		author: 'Jane Austen',
	};

    component.addToCart();

    expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({
      product: component.product,
      quantity: 1
    }));
  });
});
