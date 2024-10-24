import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { ContactComponent } from './components/contact/contact.component';
import { EventsComponent } from './components/events/events.component';

export const routes: Routes = [
	{ path: '', component: DashboardComponent },
	{ path: 'products', component: ProductListComponent },
	{ path: 'products/:category', component: ProductListComponent },
	{ path: 'product/:id', component: ProductDetailComponent },
	{ path: 'cart', component: CartComponent },
	{ path: 'contact', component: ContactComponent },
	{ path: 'events', component: EventsComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegistrationComponent },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];
