import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/auth/login/login.component';

export const routes: Routes = [
	{ path: '', component: ProductListComponent },
	{ path: 'product/:id', component: ProductDetailComponent },
	{ path: 'cart', component: CartComponent },
	{ path: 'login', component: LoginComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];
