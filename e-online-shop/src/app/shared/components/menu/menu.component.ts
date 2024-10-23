import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
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
	styleUrls: ['./menu.component.css'], // Corrected property name
})
export class MenuComponent implements OnInit, OnDestroy {
	private destroy$ = new Subject<void>();
    activeDropdown: number | null = null;
    currentRoute = '';
    isNavigating = false;

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

    constructor(private router: Router) {
        this.setupRouterListener();
    }

    ngOnInit(): void {
        this.currentRoute = this.router.url;
        this.updateActiveStates();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private setupRouterListener(): void {
        // Listen for navigation start
        this.router.events.pipe(
            filter(event => event instanceof NavigationStart),
            takeUntil(this.destroy$)
        ).subscribe(() => {
            this.isNavigating = true;
            // Close dropdown immediately when navigation starts
            this.activeDropdown = null;
        });

        // Listen for navigation end
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntil(this.destroy$)
        ).subscribe(() => {
            this.isNavigating = false;
            this.currentRoute = this.router.url;
            this.updateActiveStates();
        });
    }

    private updateActiveStates(): void {
        const activeParentIndex = this.findActiveParentIndex();
        if (activeParentIndex !== -1 && !this.isNavigating) {
            // Only update parent active state, don't show dropdown
            this.handleParentActiveState(activeParentIndex);
        }
    }

    private handleParentActiveState(index: number): void {
        const item = this.navItems[index];
        if (item.children && item.children.some(child => child.link === this.currentRoute)) {
            // Parent has active child, but don't show dropdown
            this.activeDropdown = null;
        }
    }

    private findActiveParentIndex(): number {
        return this.navItems.findIndex((item) => {
            if (item.children) {
                return item.children.some(child => child.link === this.currentRoute);
            }
            return item.link === this.currentRoute;
        });
    }

    isItemActive(index: number): boolean {
        const item = this.navItems[index];
        return !item.children && item.link === this.currentRoute;
    }

    isParentActive(index: number): boolean {
        const item = this.navItems[index];
        return item.children?.some(child => child.link === this.currentRoute) || false;
    }

    isChildActive(parentIndex: number, childIndex: number): boolean {
        const child = this.navItems[parentIndex].children?.[childIndex];
        return child?.link === this.currentRoute || false;
    }

    handleNavClick(event: MouseEvent, index: number): void {
        const item = this.navItems[index];

        if (item.children) {
            event.preventDefault();
            if (this.isNavigating) {
                // Don't toggle dropdown while navigating
                this.activeDropdown = null;
                return;
            }
            this.activeDropdown = this.activeDropdown === index ? null : index;
        } else if (item.link) {
            // For non-dropdown items, close any open dropdown
            this.activeDropdown = null;
        }
    }

    handleChildClick(parentIndex: number, childIndex: number): void {
        const child = this.navItems[parentIndex].children?.[childIndex];
        if (child) {
            // Immediately close dropdown and set navigating state
            this.activeDropdown = null;
            this.isNavigating = true;

            // Reset navigating state after navigation completes
            setTimeout(() => {
                this.isNavigating = false;
            }, 100);
        }
    }

	toggleDropdown(event: MouseEvent, index: number): void {
        event.preventDefault(); // Prevent default link action
        this.activeDropdown = this.activeDropdown === index ? null : index; // Toggle dropdown visibility
    }



}
