import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.css',
})
export class MenuComponent implements  OnInit{
	public isMenuOpen = false;
	public username: string | null = null;

	constructor(
		private router: Router
	) {}

	public ngOnInit(): void {
		if (typeof window !== 'undefined') {
			const username = localStorage.getItem('user_firstName');

			if (username) {
				this.username = username;
			}
		}
	}

	public openMenu() {
		this.isMenuOpen = true;
	}

	public closeMenu() {
		this.isMenuOpen = false;
	}
	onOverlayClick() {
		// Close the menu if the click is outside the menu content
		this.closeMenu();
	  }
	  onOverlayKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
		  this.closeMenu();
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
}
