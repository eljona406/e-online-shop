import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CartService } from './shared/services/cart.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
	title = 'e-online-shop';
	cartItemCount = 0;
	constructor(
		private router: Router,
		private cartService: CartService
	) {}

	ngOnInit() {
		// Subscribe to the cartCount observable to get updates
		this.cartService.cartCount$.subscribe((count) => {
			this.cartItemCount = count;
		});
	}
	navigateTo(path: string): void {
		this.router.navigate([path]);
	}
}
