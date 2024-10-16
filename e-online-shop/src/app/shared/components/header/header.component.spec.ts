import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeaderComponent],
			providers: [
				provideMockStore(),
				{
					provide: ActivatedRoute,
					useValue: {
						paramMap: of(new Map([['cart', '']])),
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('ngOnInit', () => {
		beforeEach(() => {
			// Reset the username before each test
			component.username = null;
		});

		it('should set the username from localStorage', () => {
			const mockLocalStorage = {
				getItem: jasmine.createSpy('getItem').and.returnValue('John Doe'),
			};

			Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

			component.ngOnInit();
			expect(component.username).toBe('John Doe');
		});

		it('should set username to null if not found', () => {
			const mockLocalStorage = {
				getItem: jasmine.createSpy('getItem').and.returnValue(null),
			};

			Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

			component.ngOnInit();
			expect(component.username).toBeNull();
		});
	});
});
