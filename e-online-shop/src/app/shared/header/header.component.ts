/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
	@Input() pageTitle = '';
	@Input() showSearch = false;

	cartCount = 0;
	isMenuOpen = false;

	constructor(private cartService: CartService) {}

	ngOnInit() {
		this.cartService.cartCount$.subscribe((count: number) => {
			this.cartCount = count;
		});
	}

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen;
	}

	onSearch(event: any) {
		console.log(event);
		//TODO
	}

	goToCart() {
		//TODO
	}
}
