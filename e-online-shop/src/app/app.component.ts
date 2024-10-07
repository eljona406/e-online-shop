import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	title = 'e-online-shop';

	constructor(
		private router: Router,
		private store: Store
	) {}

	navigateTo(path: string): void {
		this.router.navigate([path]);
	}
}
