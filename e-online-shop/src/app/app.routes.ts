import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
	{ path: '', component: ProductListComponent },
	{ path: 'product/:id', component: ProductDetailComponent },
	{ path: 'cart', component: CartComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];
