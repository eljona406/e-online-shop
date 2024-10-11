import { Component } from '@angular/core';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { LoginComponent } from '../auth/login/login.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { Product } from '../../shared/models/product.model';
import { selectProducts } from '../../core/store/products/products.selectors';
import { Observable } from 'rxjs';
import { loadProducts } from '../../core/store/products/products.actions';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [
		LoginComponent,
		RegistrationComponent,
		HeaderComponent,
		CommonModule,
		MenuComponent,
		CarouselComponent,
	],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
	public filteredProducts: Product[] = [];
	public products: Observable<Product[]>;

	constructor(private store: Store) {
		this.store.dispatch(loadProducts());
		this.products = this.store.select(selectProducts);
	}
}
