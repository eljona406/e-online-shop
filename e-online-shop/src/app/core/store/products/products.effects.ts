import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ProductService } from '../../../shared/services/products.service';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from './products.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
	private actions$ = inject(Actions); // manually inject the Actions service in your effect
	constructor(private productService: ProductService) {}

	loadProducts$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loadProducts),
			mergeMap(() =>
				this.productService.getProducts().pipe(
					map((products) => loadProductsSuccess({ products })),
					catchError((error) => of(loadProductsFailure({ error })))
				)
			)
		)
	);
}
