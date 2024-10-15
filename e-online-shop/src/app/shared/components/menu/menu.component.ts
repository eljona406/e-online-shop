import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface NavItem {
	label: string;
	link?: string;
	children?: NavItem[];
}

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
	public isMenuOpen = false;
	public username: string | null = null;

	activeDropdown: number | null = null;

	navItems: NavItem[] = [
		{
			label: 'Shop',
			children: [
				{ label: 'All Products', link: '/products/all-products' },
				{ label: 'Fantasy', link: '/products/fantasy' },
				{ label: 'Romance', link: '/products/romance' },
			],
		},
		{ label: 'Cart', link: '/cart' },
		{
			label: 'Subscriptions',

			children: [
				{ label: 'Buy a subscription', link: '/register' },
				{ label: 'My Subscription', link: '/login' },
			],
		},
		{ label: 'Events', link: '/products' },
		{ label: 'More', link: '/products' },
		{ label: 'Contact', link: '/products' },
	];

	constructor(private router: Router) {}

	public ngOnInit(): void {
		if (typeof window !== 'undefined') {
			const username = localStorage.getItem('user_firstName');

			if (username) {
				this.username = username;
			}
		}
	}

	onLogout() {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('auth_token');
			localStorage.removeItem('user_email');
			localStorage.removeItem('user_firstName');
			localStorage.removeItem('user_surname');
		}
		this.username = null;
		this.router.navigate(['/login']);
	}

	public toggleDropdown(event: Event, index: number) {
		if (this.navItems[index].children) {
			event.preventDefault();
			this.activeDropdown = this.activeDropdown === index ? null : index;
		}
	}
}
