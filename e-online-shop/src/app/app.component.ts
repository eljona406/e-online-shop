import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from './shared/components/header/header.component';
import { selectIsMenuVisible } from './core/store/ui/ui.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, HeaderComponent, CommonModule],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent {
	public title = 'e-online-shop';
	public isHeaderVisible$: Observable<boolean>;

	constructor(
		private router: Router,
		private store: Store
	) {
		this.isHeaderVisible$ = this.store.select(selectIsMenuVisible);
	}

	navigateTo(path: string): void {
		this.router.navigate([path]);
	}
}
