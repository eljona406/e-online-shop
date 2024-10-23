import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { ActivatedRoute } from '@angular/router';

describe('MenuComponent', () => {
	let component: MenuComponent;
	let fixture: ComponentFixture<MenuComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MenuComponent], // Include RouterTestingModule for routerLink
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							params: { category: 'all-products' },
						},
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(MenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render navigation items', () => {
		const navItems = fixture.nativeElement.querySelectorAll('.nav-item');
		expect(navItems.length).toBe(component.navItems.length); // Check if the number of rendered items matches the navItems array

		// Verify labels of each nav item, accounting for dropdown arrows
		component.navItems.forEach((item, index) => {
			const renderedText = navItems[index].textContent.trim();
			const expectedText = item.children ? `${item.label}  ▼` : item.label; // Include arrow if the item has children
			expect(renderedText).toBe(expectedText);
		});
	});

	it('should toggle dropdown when a nav item with children is clicked', () => {
		const navItemsWithChildren = component.navItems.filter((item) => item.children);

		// Ensure there are items with children
		expect(navItemsWithChildren.length).toBeGreaterThan(0);

		const firstDropdownNavItem = fixture.nativeElement.querySelector('.nav-item'); // Ensure this targets an item with children

		// Simulate click  to close the dropdown
		firstDropdownNavItem.dispatchEvent(new MouseEvent('click'));
		fixture.detectChanges();

		// Check if the dropdown index is reset to null
		expect(component.activeDropdown).toBeNull();
		expect(fixture.nativeElement.querySelector('.overlay-dropdown')).toBeFalsy(); // Ensure the dropdown is hidden
	});
});
