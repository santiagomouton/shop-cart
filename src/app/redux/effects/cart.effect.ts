import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, from, of } from 'rxjs';
import { map, catchError, switchMap, mergeMap, tap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import * as cartActions from '../actions/cart.actions';

@Injectable()
export class CartEffect {

  loadCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cartActions.loadCart),
      switchMap(() => {
        return this.productService.loadCart().pipe(
          map((cart) => cartActions.loadCartSuccess({ cart })),
          catchError((error) => of(cartActions.loadCartError({ error }), cartActions.newCart()))
        );
      })
    );
  });

  newCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cartActions.newCart),
      mergeMap(async (action) => {
        return this.productService
          .newCart()
          .then(() => cartActions.loadCart())
          .catch((e) => cartActions.newCartError({ error: `${e}` }));
      })
    );
  });

  addProductToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cartActions.addProductToCart),
      mergeMap(async (action) => {
        return this.productService
          .addProductToCart(action.cart, action.product)
          .then(() => cartActions.loadCart())
          .catch((e) => cartActions.addProductToCartError({ error: `${e}` }));
      })
    );
  });

  reduceProductFromCart$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(cartActions.reduceProductFromCart),
      mergeMap(async (action) => {
        return this.productService
          .reduceProductFromCart(action.cart, action.product)
          .then(() => cartActions.loadCart())
          .catch((e) =>
            cartActions.reduceProductFromCartError({ error: `${e}` })
          );
      })
    );
  });

  deleteProductToCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cartActions.deleteProductFromCart),
      mergeMap(async (action) => {
        return this.productService
          .deleteProductToCart(action.cart, action.product)
          .then(() => cartActions.loadCart())
          .catch((e) =>
            cartActions.deleteProductFromCartError({ error: `${e}` })
          );
      })
    );
  });

  buyProductsFromCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cartActions.buyProductsFromCart),
      mergeMap(async (action) => {
        return this.productService
          .buyProductsFromCart(action.cart)
          .then(() => cartActions.loadCart())
          .catch((e) =>
            cartActions.buyProductsFromCartError({ error: `${e}` })
          );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
