import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.css',
})
export class MenuComponent {
	public isMenuOpen = false;

	public openMenu() {
		this.isMenuOpen = true;
	}

	public closeMenu() {
		this.isMenuOpen = false;
	}
}
