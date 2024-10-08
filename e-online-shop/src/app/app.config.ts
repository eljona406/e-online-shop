import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { productReducer } from './core/store/products/products.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './core/store/products/products.effects';
import { CartEffects } from './core/store/cart/cart.effects';
import { cartReducer } from './core/store/cart/cart.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes, withComponentInputBinding()),
		provideClientHydration(),
		provideStore({ product: productReducer, cart: cartReducer }),
		provideEffects(CartEffects),
		provideEffects(ProductEffects),
		provideStoreDevtools({ maxAge: 25 }),
		importProvidersFrom(BrowserAnimationsModule),
	],
};
