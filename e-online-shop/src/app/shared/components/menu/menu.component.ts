import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd, NavigationStart } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

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
	styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
	public activeDropdown: number | null = null;
	public currentRoute = '';
	public isNavigating = false;

	public navItems: NavItem[] = [
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
				{ label: 'Get a subscription', link: '/register' },
				{ label: 'My Subscription', link: '/login' },
			],
		},
		{ label: 'Events', link: '/events' },
		{ label: 'More', link: '/products' },
		{ label: 'Contact', link: '/contact' },
	];

	constructor(private router: Router) {
		this.setupRouterListener();
	}

	public ngOnInit(): void {
		this.currentRoute = this.router.url;
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private setupRouterListener(): void {
		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationStart),
				takeUntil(this.destroy$)
			)
			.subscribe(() => {
				this.isNavigating = true;
				this.activeDropdown = null; // Close dropdown on navigation start
			});

		this.router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				takeUntil(this.destroy$)
			)
			.subscribe(() => {
				this.isNavigating = false;
				this.currentRoute = this.router.url;
				// this.updateActiveStates();
			});
	}

	public isItemActive(index: number): boolean {
		return this.navItems[index].link === this.currentRoute;
	}

	public isParentActive(index: number): boolean {
		return (
			this.navItems[index].children?.some((child) => child.link === this.currentRoute) ||
			false
		);
	}

	public handleNavClick(event: MouseEvent, index: number): void {
		const item = this.navItems[index];
		if (item.children) {
			event.preventDefault();
			this.activeDropdown = this.activeDropdown === index ? null : index;
		} else {
			this.activeDropdown = null; // Close dropdown on direct link click
		}
	}
}
