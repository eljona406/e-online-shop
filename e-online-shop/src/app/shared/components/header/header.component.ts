import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { selectCartCount } from '../../../core/store/cart/cart.selectors';
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
	@Input() showMenu: boolean | undefined;

	public cartCount$: Observable<number> = of(0);
	public isMenuOpen = false;
	public username: string | null = null;

	constructor(private store: Store) {}

	ngOnInit() {
		this.cartCount$ = this.store.select(selectCartCount).pipe(
			map((count) => count || 0) // Emit 0 if count is null or undefined
		);

		if (typeof window !== 'undefined') {
			const username = localStorage.getItem('user_firstName');

			if (username) {
				this.username = username;
			}
		}
	}

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}
}
