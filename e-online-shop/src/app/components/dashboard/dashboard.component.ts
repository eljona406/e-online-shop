import { Component } from '@angular/core';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { LoginComponent } from '../auth/login/login.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../shared/components/menu/menu.component';

interface NavItem {
	label: string;
	link: string;
	children?: NavItem[];
  }

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [LoginComponent, RegistrationComponent, HeaderComponent, CommonModule, MenuComponent],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
	activeDropdown: number | null = null;

	navItems: NavItem[] = [
		{ label: 'Shop', link: '/products' },
		{ label: 'Bags', link: '/products' },
		{
			label: 'Subscriptions',
			link: '',
			children: [
				{ label: 'Buy a subscription', link: '/register' },
				{ label: 'My Subscription', link: '/login' },
			],
		},
		{ label: 'Events', link: '/products' },
		{ label: 'More', link: '/products' },
		{ label: 'Contact', link: '/products' },
	];
	constructor(private store: Store) {
		//this.store.dispatch(setHeaderVisibility({ isHeaderVisible: true }));
		//	this.store.dispatch(setMenuVisibility({ isMenuVisible: false }));
	}

	public toggleDropdown(event: Event, index: number) {

		if (this.navItems[index].children) {
		  event.preventDefault();
		  this.activeDropdown = this.activeDropdown === index ? null : index;
		}
	  }
}
