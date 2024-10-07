// cart.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { addToCart } from './cart.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class CartEffects {
	private actions$ = inject(Actions);

	logAddToCart$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(addToCart),
				tap((action) => console.log('Added to cart:', action.product))
			),
		{ dispatch: false } // Set to false if you do not want to dispatch another action
	);
}
