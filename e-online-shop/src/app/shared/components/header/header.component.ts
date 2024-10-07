import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { selectCartCount } from '../../../store/cart/cart.selectors';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { RouterModule } from '@angular/router';
@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, MenuComponent, RouterModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
	@Input() pageTitle = '';
	@Input() showSearch = false;

	cartCount$: Observable<number> = of(0); // Use observable for cart count
	isMenuOpen = false;

	constructor(private store: Store) {}

	ngOnInit() {
		// Select cart count from the store and handle potential null values
		this.cartCount$ = this.store.select(selectCartCount).pipe(
			map((count) => count || 0) // Emit 0 if count is null or undefined
		);
	}

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}
}
