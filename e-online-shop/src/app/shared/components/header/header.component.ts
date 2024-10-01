import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
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
}
