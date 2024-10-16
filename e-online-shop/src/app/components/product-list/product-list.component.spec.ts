import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../../shared/models/product.model';
import { addToCart } from '../../core/store/cart/cart.actions';
import { selectProducts } from '../../core/store/products/products.selectors';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockStore: MockStore;

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      category: 'Category 1',
      author: 'Author 1',
      rating: 4.5,
      isInStock: true,
      quantity: 2,
      images: [],
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      price: 150,
      category: 'Category 2',
      author: 'Author 2',
      rating: 4.0,
      isInStock: true,
      quantity: 5,
      images: [],
    },
  ];

  const initialState = {
    products: mockProducts,
    cart: {
      items: [],
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['category', 'all-products']])),
          },
        },
      ],
    }).compileComponents();

    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectProducts, mockProducts);
    spyOn(mockStore, 'dispatch').and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ProductListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should show all products if "all-products" is selected', (done) => {
    component.setCategory('all-products');
    fixture.detectChanges();

    component.products$.subscribe((products) => {
      console.log('Products in test:', products);
      fixture.detectChanges();
      const productElements = fixture.nativeElement.querySelectorAll('.product-card');
      console.log('Product elements:', productElements.length);
      expect(productElements.length).toBe(mockProducts.length);
      done();
    });
  });

  it('should add a product to the cart', () => {
    const productToAdd = mockProducts[0];
    component.addToCart(productToAdd);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      addToCart({ product: productToAdd, quantity: 1 })
    );
  });
});